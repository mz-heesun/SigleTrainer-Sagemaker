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