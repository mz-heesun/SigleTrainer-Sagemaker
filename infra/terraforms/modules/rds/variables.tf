variable "region" {
  description = "AWS Region"
  type        = string
  default     = "ap-northeast-2"
}

variable "name_prefix" {
  description = "Name Prefix"
  type        = string
  default     = "dev"
}

variable "tags" {
  type = map(string)
  description = "Tags to apply to all resources"
  default = {}
}

variable "private_subnets" {
  type = list(string)
  description = "Private Subnets"
  default = []
}

variable "rds_to_bastion_security_group_id" {
  description = "Set bastion security group id"
  type        = string
}

variable "bastion_host_availability_zone" {
  description = "private resource의 availability zone"
  type        = string
  default     = "us-east-2b"
}