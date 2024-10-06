import Image from 'next/image'

export default function Card() {
  return (
    <article className='bg-black border border-foreground rounded-md'>
      <figure className='bg-white bg-cover border-b rounded-t-sm aspect-square relative w-full'>
        <Image
          src={ "/pxArt.png" }
          fill
          style={ { objectFit: "cover" } }
          alt="Picture of the author"
        />
      </figure>
      <header className='p-4 border-b'>
        {/* judul */ }
        <a>
          <h3 className='text-xl'>Foto bagus</h3>
        </a>
        {/* user */ }
        <a>
          <p className='text-sm underline'>tomi</p>
        </a>
      </header>
      <footer>
        {/* grid */ }
        <div className='grid grid-cols-4 divide-x'>
          {/* desc of the item */ }
          <div className='p-4 col-span-3'>
            <p>barang ini ditemukan di pekalongan samping tutorial yutub...</p>
          </div>
          {/* lost ? found */ }
          <div className='p-4'>
            <p>lost</p>
          </div>
        </div>
      </footer>
    </article>
  )
}