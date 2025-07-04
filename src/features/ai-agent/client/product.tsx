
export interface DummyProductResponse {
  products: DummyProduct[]
  total: number
  skip: number
  limit: number
}

export interface DummyProduct {
  id: number
  title: string
  price: string
}

const Product = ({ product }: { product: DummyProduct }) => {
  return (
    <div className='flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 p-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col justify-center gap-1'>
          <div className='text-primary font-bold'>
            {product.id} - {product.title}
          </div>
          <div className='text-muted-foreground text-sm'>{product.price}</div>
        </div>
      </div>
    </div>
  )
}
export default Product
