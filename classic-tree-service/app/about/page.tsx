import React from 'react'

const About = () => {
  return (
    <div className='about'>
      <h1>About Us</h1>
      <div className="ins">
      <img src="/sky-tree.jpeg" alt="trees" />
      <h2 className='who'>
        Who We Are
      </h2>
      <p>
      Classic Tree Service is a small, dedicated team committed to providing exceptional tree care. As a locally owned and operated business, we take pride in serving our community with personalized and professional services. Our experienced team is passionate about trees and is here to ensure your property looks its best. Trust us to deliver quality and care in every job we undertake.
      </p>

      </div>
      <div className="info">
        <div className="more">
          <img src="3-tree copy.jpg" alt="tree" />
          <h2>Services</h2>
          <p>At Classic Tree Service, we specialize in tree trimming, tree removal, and stump removal for all types of trees. Whether you need regular maintenance or emergency service, our experienced team is here to help. We handle every job with professionalism and care to ensure your trees and property look their best.</p>
        </div>
        <div className="more">
          <img src="yellow-tree.jpeg" alt="tree" />
          <h2>Licensed and Insured</h2>
          <p>Classic Tree Service is fully licensed and insured, ensuring safe and reliable tree care services. Your property and peace of mind are our top priorities. Trust us to handle your tree care needs with professionalism and care.</p>
        </div>
      </div>
    </div>
  )
}

export default About