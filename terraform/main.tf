terraform {
  backend "s3" {
    bucket = "perfsys-patients-claims"
    key = "terraform.tfstate"
    region = "eu-central-1"
  }
}
provider "aws" {
  region = var.aws-region
}


# Create the Security Group
resource "aws_security_group" "perfsys-patient-claims" {
#  vpc_id       = aws_vpc.main.id
  name         = "perfsys-patient-claims"
  description  = "allow 3000, 4200, 27017 for all"
  
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
  } 
  
  ingress {
    cidr_blocks = ["0.0.0.0/0"]  
    from_port   = 4200
    to_port     = 4200
    protocol    = "tcp"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"] 
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
  }
  # allow egress of all ports
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
} # end resource



## create ECR for backend & frontend image
resource "aws_ecr_repository" "perfsys-patient-claims-backend" {
  name = "perfsys-patient-claims-backend"
}
output "ecr_backend_url" {
  value = "${aws_ecr_repository.perfsys-patient-claims-backend.repository_url}"
}

resource "aws_ecr_repository" "perfsys-patient-claims-frontend" {
  name = "perfsys-patient-claims-frontend"
}
output "ecr_frontend_url" {
  value = "${aws_ecr_repository.perfsys-patient-claims-frontend.repository_url}"
}
##

## github access token
resource "aws_codebuild_source_credential" "github_token" {
  auth_type = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token = var.personal_token
}
##

## create role for build
resource "aws_iam_role" "codebuild-container-registry" {
  name = "codebuild-container-registry"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
##

## define policy for role
resource "aws_iam_role_policy" "codebuild-container-registry" {
  role = aws_iam_role.codebuild-container-registry.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs",
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:GetRepositoryPolicy",
        "ecr:DescribeRepositories",
        "ecr:ListImages",
        "ecr:DescribeImages",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ],
      "Resource": "*"
    }
  ]
}
POLICY
}
##

## create code build for backend
resource "aws_codebuild_project" "perfsys-patients-claims-backend" {
  name          = "perfsys-patients-claims-backend"
  description   = "perfsys-patients-claims-backend"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild-container-registry.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:3.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "true"
    environment_variable {
      name  = "ECR_URL_BACKEND"
      value = aws_ecr_repository.perfsys-patient-claims-backend.repository_url
    }
  }
  logs_config {
    cloudwatch_logs {
      group_name = "log-group"
      stream_name = "log-stream"
    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/perfsys/patients-claims-typescript-sample.git"
    git_clone_depth = 1
    buildspec       = "backend/buildspec.yml"
    auth {
        type = "OAUTH"
        resource = aws_codebuild_source_credential.github_token.arn
    }
  }
}
##

## create code build for frontend
resource "aws_codebuild_project" "perfsys-patients-claims-frontend" {
  name          = "perfsys-patients-claims-frontend"
  description   = "perfsys-patients-claims-frontend"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild-container-registry.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:3.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "true"
    environment_variable {
      name  = "ECR_URL_FRONTEND"
      value = aws_ecr_repository.perfsys-patient-claims-frontend.repository_url
    }
  }
  logs_config {
    cloudwatch_logs {
      group_name = "log-group"
      stream_name = "log-stream"
    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/perfsys/patients-claims-typescript-sample.git"
    git_clone_depth = 1
    buildspec       = "front/buildspec.yml"
    auth {
        type = "OAUTH"
        resource = aws_codebuild_source_credential.github_token.arn
    }
  }
}
##

## create ECS cluster
resource "aws_ecs_cluster" "perfsys-patient-claims" {
  name = "perfsys-patient-claims"
}
##