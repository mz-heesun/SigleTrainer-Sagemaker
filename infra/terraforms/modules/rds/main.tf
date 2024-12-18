resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = var.private_subnets
}

resource "aws_db_instance" "default" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t3.medium"
  identifier           = "llama-factory-db"
  username             = "root"
  password             = "password"
  db_subnet_group_name = aws_db_subnet_group.default.name
  vpc_security_group_ids = [var.rds_to_bastion_security_group_id]
  skip_final_snapshot  = true
  availability_zone    = var.bastion_host_availability_zone
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-MYSQL_8.0"
  })
}
