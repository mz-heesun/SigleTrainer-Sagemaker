locals {
  region      = "us-east-2"
  environment = "dev"
  default_tags = {
    Terraform   = "true"
    Environment = "dev"
  }
  # github_connection_arn = "arn:aws:codeconnections:ap-northeast-2:590184018013:connection/b4bfb5b5-cb2d-468c-8721-5394da7b2f53"
}

module "vpc" {
  source      = "./modules/vpc"
  name_prefix = local.environment
  tags = merge(local.default_tags, {
    Service = "VPC"
  })
}


module "rds" {
  source      = "./modules/rds"
  name_prefix = local.environment
  tags = merge(local.default_tags, {
    Service = "RDS"
  })
  private_subnets                  = module.vpc.private_subnet_ids
  rds_to_bastion_security_group_id = module.vpc.bastion_security_group_id
  bastion_host_availability_zone   = module.vpc.bastion_public_subnet_availability_zone
}

module "ec2" {
  source      = "./modules/ec2"
  name_prefix = local.environment
  tags = merge(local.default_tags, {
    Service = "EC2"
  })
  vpc_id                         = module.vpc.vpc_id
  bastion_security_group_id      = module.vpc.bastion_security_group_id
  public_subnet_id               = module.vpc.bastion_public_subnet_id
  bastion_host_availability_zone = module.vpc.bastion_public_subnet_availability_zone
}