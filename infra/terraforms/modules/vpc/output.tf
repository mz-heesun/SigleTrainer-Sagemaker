output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnet_ids" {
  value = [aws_subnet.private_b.id, aws_subnet.private_c.id]
}

output "public_subnet_ids" {
  value = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

output "bastion_public_subnet_id" {
  value = aws_subnet.public_b.id
}

output "bastion_public_subnet_availability_zone" {
  value = aws_subnet.public_b.availability_zone
}

output "bastion_security_group_id" {
  value = aws_security_group.bastion_sg.id
}

