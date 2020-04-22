import React, { useEffect, useState } from "react";
import { MDBCol, MDBRow, MDBMask, MDBView, MDBContainer, MDBIcon } from "mdbreact";
import {
    Image,
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { connect } from 'react-redux';

import "pure-react-carousel/dist/react-carousel.es.css";
import {categoryChange} from '../redux/actions';


const Categories = ({categoryChange}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const category = async () => {
      setCategories(await fetch("http://localhost:9000/orchids/categories", {credentials: "include"}).then(async data => await data.json())) 
    };
    category();
  }, [])

  return (
    <MDBContainer className="mt-4">
      <MDBRow>
        <CarouselProvider
            className='w-100 d-flex'
          naturalSlideWidth={400}
          naturalSlideHeight={200}
          visibleSlides={3}
          totalSlides={categories.length}
        >
          <ButtonBack className="slider-button align-self-center"><MDBIcon icon="angle-double-left" /></ButtonBack>
          <Slider className="w-100">
            {categories.length ? categories.map((category) => (
              <Slide>
                <MDBCol className="w-100 h-100">
                  <MDBView className="w-100 h-100 rounded pointer" onClick={()=> categoryChange(category.Name)}>
                    <Image
                      src={category.Image}
                      className="img-fluid img-category"
                      alt=""
                    />
                    <MDBMask className="flex-center" overlay="teal-light">
                      <p className="white-text">{category.Name}</p>
                    </MDBMask>
                  </MDBView>
                  </MDBCol>
              </Slide>
            )) : '' }
          </Slider>
          <ButtonNext className="slider-button align-self-center"><MDBIcon icon="angle-double-right" /></ButtonNext>
        </CarouselProvider>
      </MDBRow>
      </MDBContainer>
  );
};

const mapDispatchToProps = {
  categoryChange,
};

export default connect(null, mapDispatchToProps)(Categories);
