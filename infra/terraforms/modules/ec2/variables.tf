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


variable "vpc_id" {
  description = "Create to VPC"
  type        = string
}

variable "public_subnet_id" {
  description = "Attach to public subnet"
  type        = string
}

variable "bastion_security_group_id" {
  description = "Set bastion security group id"
  type        = string
}

variable "bastion_host_availability_zone" {
  description = "private resource의 availability zone"
  type        = string
  default     = "us-east-2b"
}