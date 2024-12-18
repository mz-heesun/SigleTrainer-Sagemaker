locals {
  region      = "ap-northeast-2"
  environment = "dev"
  name_prefix = upper(local.environment)
  default_tags = {
    Terraform   = "true"
    Environment = "dev"
  }
  # github_connection_arn = "arn:aws:codeconnections:ap-northeast-2:590184018013:connection/b4bfb5b5-cb2d-468c-8721-5394da7b2f53"
}

provider "aws" {
  region = local.region
}

module "vpc" {
  source      = "./modules/vpc"
  region      = local.region
  name_prefix = local.name_prefix
  tags = merge(local.default_tags, {
    Service = "VPC"
  })
}


module "rds" {
  source                           = "./modules/rds"
  region                           = local.region
  name_prefix                      = local.name_prefix
  private_subnets                  = module.vpc.private_subnet_ids
  rds_to_bastion_security_group_id = module.vpc.bastion_security_group_id
  bastion_host_availability_zone   = module.vpc.bastion_public_subnet_c_availability_zone
  tags = merge(local.default_tags, {
    Service = "RDS"
  })
}

module "ec2" {
  source                         = "./modules/ec2"
  region                         = local.region
  name_prefix                    = local.name_prefix
  vpc_id                         = module.vpc.vpc_id
  public_subnet_id               = module.vpc.bastion_public_subnet_c_id
  bastion_security_group_id      = module.vpc.bastion_security_group_id
  bastion_host_availability_zone = module.vpc.bastion_public_subnet_c_availability_zone
  tags = merge(local.default_tags, {
    Service = "EC2"
  })
}