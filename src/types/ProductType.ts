export type ProductType = {
  id: string,
  name: string,
  image?: {
    file: string,
    width: number,
    height: number,
  },
  description: string,
  priceFormatted: string,
  manufacturer: {
    name: string,
    image?: {
      file: string,
      width: number,
      height: number,
    }
  }
}