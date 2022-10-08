import Link from 'next/link'
import DashboardMap from '../components/DashboardMap'
import { sanityClient, urlFor } from '../sanity'
import { clipTitle, isMultiple } from '../utils'

const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className='main'>
          <div className='feed-container'>
            <h1>Places to stay near you</h1>
            <div className='feed'>
              {properties.map((property) => (
                <Link
                  key={property._id}
                  href={`property/${property.slug.current}`}>
                  <div className='card'>
                    <img src={urlFor(property.mainImage)} alt='' />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{clipTitle(property.title)}</h3>
                    <h3>
                      <b>${property.pricePerNight}/per night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='map'>
            {/* TODO: dashboard map displaying all listed properties */}
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default Home
