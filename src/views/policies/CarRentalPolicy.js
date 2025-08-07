import React from "react";
import TheFooter from "../../bucket/TheFooter";

const CarRentalPolicy = ({token}) => {
  const data = [
    {
      title: "User Information",
      values: [
        "We operate with our chauffeur (drivers) only.",
        "It is compulsory clients make full payments before service.",
        "Rented vehicle can only be driven by the individuals specified in rental contract and delivery form. Any accidents arising by third party individuals other than individuals specified in the car rental contract shall not be covered by the guarantee. You can contact our office if you want to add excort.",
      ],
    },
    {
      description: "",
      title: "Rental Duration",
      values: [
        "Minimum rental duration is 12:00 HOURS within Lagos (6:00am to 6: 00pm )",
        "We also have arrangement for States within the south western part of Nigeria.",
      ],
    },

    {
        description: "",
        title: "Late Delivery",
        values: [
          "If you return your car 30minutes or more than reserved time (over-time), the hourly rental price for that day shall be added to the contract and collected from you, VAT included.",
        ],
      },

      {
        description: "",
        title: "Fuel",
        values: [
          "We will provide a full tank of fuel, clients will continue to fuel after exhausting the fuel."
        ],
      },

      {
        description: "",
        title: "Reservations",
        values: [
          "Reservations are made only through our representatives or website, therefore we cannot guarantee brand, model, color and fuel type. Although we try to provide our customers with vehicles in the class they demand as much as possible, due to operational reasons, we cannot always guarantee brand, model, color and fuel type."
        ],
    },

        {
            description: "",
            title: "Car Delivery",
            values: [
              "After The reservation you have made has been confirmed according to the vehicle group and there is no guarantee of any brand and / or model. If your requested vehicle or equivalent cannot be allocated to you, a free upgrade or a downgrade can be made by updating the price.",
              "It is important to closely follow your pick-up time, if any, in all your reservations. Providing your number will make it easier for us to track possible delays and updates you. If you have not come to pick up the vehicle 1 hour after the beginning of your contract time and if you cannot be reached or the reservation cannot be confirmed, the relevant reservation may be canceled."
            ]
      },
      {
        description: "",
        title: "One-Way Rental",
        values: [
            "Returning the car in a different city than rented shall be subjected our approval and at an additional fee. Since additional fee changes for region/office, you can call our call center for more information."
          ]
        },
        {
            description: "",
            title: "ASSURANCE and GUARANTEE",
            values: [
                "The vehicle assurance plans change for campaign and price. Assurance plan details are specified in the contract and delivery form. Please contact our booking call center or office to learn more about additional assurance fees and limit. The details of the assurance and guarantee provided as a service are given below."
              ]
            },
            {
                description: "",
                title: "TRAFFIC FINES",
                values: [
                    "Traffic fines due to violating traffic rules (incorrect line selection in bridges and highways) shall be collected from the renter specified in the contact.",
                    "Other than the traffic fines which occur within rental period are collected from the customers, additional 100,000 Naira Service Fee shall be collected for caution fee."
                  ]
                },

                {
                    description: "",
                    title: "Early Delivery",
                    values: [
                        "There will be no refund if the vehicles are returned before the end of the booking date. "
                      ]
                    },
                    {
                        description: "",
                        title: "Extending Rental Duration",
                        values: [
                            "Upon the expiration of the rental period, the tenant will not be able to extend the rental period unilaterally. If the tenant wants to extend the rental period, the rental period may be extended with the written consent of the lessor or the tenant will consent to the new vehicle to be given. If the Lessor does not approve the tenant's request to extend the rental period and in any case, on the expiry of the rental period specified in this Agreement; The tenant will leave the vehicle he has rented to the return location specified in the rental contract. Lease extensions will be bound by the terms of this contract even if the next lease contract has not been signed. In the event that the rental request requested by the customer is approved, The said car rental will be made over the current price, not the price. The tenant acknowledges that failing to deliver the vehicle despite the expiry of the contract period constitutes a crime under the provisions of criminal law and will not keep the vehicle outside the rental period. It accepts and declares that it is aware that it cannot benefit from insurance, guarantees and legal rights after the end of the rental period and / or during illegal vehicle use."
                          ]
                        },
                        {
                            description: "",
                            title: "Cancellation and Return",
                            values: [
                                "Reservations can be canceled 24 hours before the reservation time on the date the reservation was made, and in such a case, no fee will be charged. Customers who do not arrive at the reservation start time and request cancellation after this time will be refunded the fee they paid with a 1-day deduction. If your reservation cancellation request is made less than 24 hours before your vehicle purchase date, a one-day No Show fee will be deducted and the remaining amount will be refunded to the card with which you paid."
                              ]
                            },
                            {
                                description: "",
                                title: "IMPORTANT NOTICE",
                                values: [
                                    "All fees related to the car rental shall be deducted from tenant.",
                                    "In accidents with material damages, involving parties can file their own accident report.",
                                    "In case of vehicle theft, you need to call the police and have theft report. You need to return the theft report and the vehicle key to us.",
                                    "If you need emergency help in case of accident, theft, malfunction, flat tire etc., you can call our call center offering 24/4 services in Nigeria. 08062106504 Our insurance does not cover any travels outside  south western states in Nigeria.",
                                    "Our vehicles cannot be used outside south west states in Nigeria. Please check rental form and agreement.",
                                    "Booking is confirmed without specifying any brand or model guarantee.",
                                    "Renter accepts and approves any mechanical and electrical damage and costs due to renter errors or lack of attention. All these damages and costs including mechanical and electrical issues are not covered under vehicle insurance policy and guarantee.",
                                    "If the rented vehicle cannot be used due to damage, malfunction or any other reason, another vehicle in the same segment or in a higher segment is allocated within 24 hours. In order to provide a replacement vehicle in case of damage or accident, all relevant accident reports and alcohol report must be completed and delivered to us. If these documents are not delivered to us, the 24-hour period may vary.",
                                    "At the end of the rental, check if you have any personal belongings in the vehicle. Responsibility for personal belongings left in the vehicle belongs to the lessor. We cannot be held responsible for the loss of any property carried or left in the vehicle by the lessor of the vehicle. The lessor of the vehicle releases the lessor from lawsuits, accusations, complaints and damages that may occur as a result of such loss or damage."
                                  ]
                                },
    
     
  ];
  return(<> <div className="policies">
    {data.map((item, i)=>(
        <div className="policiesContent" key={i}>
            <div className="policiesContentTitle">{item.title}</div>
            {item?.description && <div className="policiesContentDescription">{item.description}</div>}
            <ul className="policiesContentItems">
            {item.values.map((value, i)=>(
                <li className="policiesConentItemsItem" key={i}>{value}</li>
            ))}
        </ul>
        </div>
    ))}
  </div>
  <TheFooter token={token} /></>)
};

export default CarRentalPolicy;
