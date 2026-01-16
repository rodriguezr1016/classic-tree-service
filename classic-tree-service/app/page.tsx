import React from 'react'
import Jumbotron from './components/Jumbotron/jumbotron'


const Home = () => {
  return (
    <div>
      <Jumbotron />
      <main className='home'>
      <p className="hidden">
      No one cuts trees quite like Classic Tree Service! When you need work done on your trees, we are the people to call. We will handle your trees with expert care and make sure that you're happy with what you paid for.
      </p>
        <div className="summary">
          <div>
          <img src="/tree.jpeg" alt="tree" />

          </div>
          <div>
            <h2>Small Business</h2>
          <p>We are a small business that cares. We ensure that our clients are not only getting their moneys worth, but that they are also receiving the best care possible. With our incredibly low prices and a precise attention to detail, we firmly believe that we are the right choice for you.</p>

          </div>
        </div>
        <div className="summary">
          <div className='item'>
          <h2>Customer Satisfaction Guaranteed</h2>
          <p className='item'>
           Your satisfaction is our priority. We aim to provide a service that will not only be up to your standards, but will also be something that we can be proud to put our names on. Furthermore, we ensure that we understand your goals and vision before starting the project so that your needs are met.
          </p>

          </div>
          <div>
          <img className= 'item' src="/tree1.jpeg" alt="tree" />

          </div>
        </div>
        <h1>Services</h1>
      <div className="services">
        <div className='service'>
          <img src="/trimming.jpg" alt="trimming" />
          <h2>
            Trimming
          </h2>
          <p>
            We do all types of trimming and pruning for all types of trees big or small. Whether you need your tree to be cut back, worried about a branch falling, or just need your tree to be cleaned up, we've got you covered.
          </p>

        </div>
        <div className='service'>
          <img src="/removal.jpg" alt="removal" />
          <h2>Removal</h2>
          <p>Tired of a certain tree? We can take care of that for you too. With the use of ropes and pulleys, we'll make sure the job gets done quickly and safely. Along with this service, we also provide stump grinding. After we're done, you'll hardly even notice there once was a tree there.</p>
        </div>
        <div className='service'>
          <img src="/palm-tree.jpeg" alt="palm" />
          <h2>
            Consulting
          </h2>
          <p>With one quick visit we can help you decide the best course of action to take. We can help answer any of your questions about your tree. With the help of our expert opinions, we can help you make the right choice for you and your tree.</p>
        </div>
      </div>

        
      </main>
      </div>
  )
}

export default Home