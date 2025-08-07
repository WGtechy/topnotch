import React from 'react'
import SectionLayout1 from './SectionLayout1';

const Comment = () => {
  const commentsArr = [
    {
      name: "Godwin Williams",
      img: '5.jpg',
      rating: 5,
      comment: "the leap into electronic typesetting, remaining essentially unchangthe leap into electronic typesetting, remaining essentially unchang",
      type: "ratings",
    },
    {
      name: "Emeka Emele",
      img: '4.jpg',
      rating: 5,
      comment: "the leap into electronic typesetting, remaining essentially unchangthe leap into electronic typesetting, remaining essentially unchang",
      type: "ratings",
    },
   
    {
      name: 'Sammie John',
      img: '3.jpg',
      rating: 5,
      comment: "the leap into electronic typesetting, remaining essentially unchangthe leap into electronic typesetting, remaining essentially unchang",
      type: "ratings",
    },
  ]

    const sectionProps = {title: 'Testimonials', cardType: 'multipurpose', backgroundColor: "#cbeaef", data: commentsArr}
    return ( <SectionLayout1 {...sectionProps} />  );
}

export default Comment