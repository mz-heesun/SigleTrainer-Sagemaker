resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-VPC"
  })
}

resource "aws_subnet" "subnet_public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.region}a"
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PUBLIC-SUBNET-A"
  })
}

resource "aws_subnet" "subnet_public_c" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.region}c"
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PUBLIC-SUBNET-C"
  })
}

resource "aws_subnet" "subnet_private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block = "10.0.4.0/24"  # 변경된 CIDR 블록
  availability_zone = "${var.region}b"
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PRIVATE-SUBNET-B"
  })
}

resource "aws_subnet" "subnet_private_c" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.region}c"
  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PRIVATE-SUBNET-C"
  })
}


resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PUBLIC-ROUTE-TABLE"
  })
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway.id
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-PRIVATE-ROUTE-TABLE"
  })
}


resource "aws_route_table_association" "public_route_table_a" {
  subnet_id      = aws_subnet.subnet_public_a.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_route_table_b" {
  subnet_id      = aws_subnet.subnet_public_c.id
  route_table_id = aws_route_table.public_route_table.id
}


resource "aws_route_table_association" "private_route_table_b" {
  subnet_id      = aws_subnet.subnet_private_b.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "private_route_table_c" {
  subnet_id      = aws_subnet.subnet_private_c.id
  route_table_id = aws_route_table.private_route_table.id
}