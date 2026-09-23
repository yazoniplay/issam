-- IssamExprec database schema

create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text,
  description text,
  price numeric not null,
  image_url text,
  category text,
  created_at timestamp default now()
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text,
  email text,
  phone text,
  address text,
  total numeric,
  status text default 'Pending',
  created_at timestamp default now()
);

create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer default 1,
  price numeric
);
