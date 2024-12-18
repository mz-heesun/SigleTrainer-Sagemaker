resource "aws_eip" "eip_nat" {
  lifecycle {
    create_before_destroy = true
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-ip"
  })
}

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = aws_eip.eip_nat.id
  subnet_id     = aws_subnet.subnet_public_a.id

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-natgw"
  })
}