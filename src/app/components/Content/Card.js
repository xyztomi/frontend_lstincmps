import Image from 'next/image'

export default function Card({ data }) {
  return (
    <article className='bg-black border border-foreground rounded-md'>
      <figure className='bg-white bg-cover border-b rounded-t-sm aspect-square relative w-full'>
        <Image
          src={ data.image }
          fill
          style={ { objectFit: "cover" } }
          alt="Picture of the author"
        />
      </figure>
      <header className='p-4 border-b'>
        {/* judul */ }
        <a>
          <h3 className='text-xl'>{data.title}</h3>
        </a>
        {/* user */ }
        <a>
          <p className='text-sm underline'>{data.user}</p>
        </a>
      </header>
      <footer>
        {/* grid */ }
        <div className='grid grid-cols-4 divide-x'>
          {/* desc of the item */ }
          <div className='p-4 col-span-3'>
            <p>{data.description}</p>
          </div>
          {/* lost ? found */ }
          <div className='p-4'>
            <p>{data.status}</p>
          </div>
        </div>
      </footer>
    </article>
  )
}