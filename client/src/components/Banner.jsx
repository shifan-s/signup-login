import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out", 
    
  };

  const slideStyle = {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '10px'
  };

  return (
    <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '20px 0' }}>
      <Slider {...settings}>
        <div>
          <img
            src='https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0'
            alt='Slide 1'
            style={slideStyle}
          />
        </div>
        <div>
          <img
            src='https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0'
            alt='Slide 2'
            style={slideStyle}
          />
        </div>
        <div>
          <img
            src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0'
            alt='Slide 3'
            style={slideStyle}
          />
        </div>
        <div>
          <img
            src='https://plus.unsplash.com/premium_photo-1673512328012-dbe3d20a2894?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0'
            alt='Slide 4'
            style={slideStyle}
          />
        </div>
        
      </Slider>
    </div>
  );
};

export default Banner;
