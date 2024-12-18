resource "aws_iam_role" "ssm_role" {
  name = "${var.name_prefix}-SSM_ROLE"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_attach" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_profile" {
  name = "${var.name_prefix}-SSM_PROFILE"
  role = aws_iam_role.ssm_role.name
}

data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners = ["amazon"]

  filter {
    name = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name = "state"
    values = ["available"]
  }
}


resource "aws_instance" "bastion" {
  ami = data.aws_ami.latest_amazon_linux.id  # Amazon Linux 2 AMI
  instance_type     = "t2.nano"
  subnet_id         = var.public_subnet_id
  security_groups = [var.bastion_security_group_id]
  availability_zone = var.bastion_host_availability_zone

  iam_instance_profile = aws_iam_instance_profile.ssm_profile.name

  tags = {
    Name = "${var.name_prefix}-BASTION-HOST"
  }
}

