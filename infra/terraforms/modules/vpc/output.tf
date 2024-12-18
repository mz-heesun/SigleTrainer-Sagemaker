output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnet_ids" {
  value = [aws_subnet.subnet_private_b.id, aws_subnet.subnet_private_c.id]
}

output "public_subnet_ids" {
  value = [aws_subnet.subnet_public_a.id, aws_subnet.subnet_public_c.id]
}

output "bastion_public_subnet_a_id" {
  value = aws_subnet.subnet_public_a.id
}

output "bastion_public_subnet_c_id" {
  value = aws_subnet.subnet_public_c.id
}

output "bastion_public_subnet_a_availability_zone" {
  value = aws_subnet.subnet_public_a.availability_zone
}

output "bastion_public_subnet_c_availability_zone" {
  value = aws_subnet.subnet_public_c.availability_zone
}

output "bastion_security_group_id" {
  value = aws_security_group.bastion_sg.id
}

