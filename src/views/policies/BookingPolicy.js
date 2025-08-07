import React from "react";
import TheFooter from "../../bucket/TheFooter";

const BookingPolicy = ({token}) => {
  const data = [
    {
      description:
        "We maintain a NO REFUND POLICY therefore Clients are employed to contact our customer representatives to reconfirm availability at the point of payment to prevent date clashes. Payment of refundable caution fee is compulsory.",
      title: "Cancellation/No-Show Policy:",
      values: [
        "At least 5 days prior to the arrival date - no cancellation fees apply and customers will be able to make changes in date depending on availability.",
        "At least 3 days prior to the arrival date - 85% refund of the total amount shall be granted and customers will be able to make changes depending on availability. ",
        "At least 24 hours prior to the arrival date - 70% refund of the total amount shall be granted and customers will be able to make changes in date depending on availability.",
        "If the time for cancelling without penalty has passed, the forfeiture amount will be 100%. There may be additional applicable charges and taxes.",
        "The refund policy is based on the total amount of the stay, not on the prepaid 40% to confirm reservation. ",
        "In case of proved deaths or accidents, a refund may be granted by the General Manager’s and/or Director.",
        "In case the CLIENT arrives the day following arrival before check-out time (11:00 hours), the fee for No-Show for one night’s stay based on the room category booked, shall apply, and the booking for the remaining time shall remain valid. In case the client arrives the day following arrival after check-out time (11:00 hours), he shall lose the booking.",
      ],
    },
    {
      description: "",
      title: "Corporate Bookings",
      values: [
        "At least 10 days prior to the arrival date - no cancellation fees apply and a refund of the total amount shall be granted.",
        "At least 5 days prior to the arrival date - 70% refund of the total amount shall be granted. ",
        "At least 48 hours prior to the arrival date - 60% refund of the total amount shall be granted. ",
        "If the time for cancelling without penalty has passed, the forfeiture amount will be 100%. There may be additional applicable charges and taxes. ",
        "The refund policy is based on the total amount of the stay, not on the prepaid 40% to confirm reservation. ",
        "In case of proved deaths or accidents, a refund -may be granted by the General Manager’s and/or Director. ",
        "In case the clients arrives the day following arrival before check-out time (11:00 hours), the fee for No-Show for one night’s stay based on the room category booked, shall apply, and the booking for the remaining time shall remain valid. In case they arrives the day following arrival after check-out time (11:00 hours), they shall lose the booking. ",
      ],
    },
    {
        description: "",
        title: "Check-in Policy",
        values: [
// 1. Check-In Time: 14:00hrs - 22:00hrs     Check-Out Time: 12:00hrs

// 2. Early check-in or late check-out is subject to availability on the relevant day, to be reconfirmed with the manager.

// 3. For Premium Business privilege clients, a flexible (24:00 hrs) check-in and check-out policy, subject to availability, applies.

// 4. Apartments not occupied by 22:00 hours will be seen as No-Show, unless prior arrangement has been made.

// 5. All reservation payments are non-refundable especially during peak seasons. The definition of the Peak Season period will be determined by a unilateral decision of the   Management.

// 6. It is mandatory for all clients to produce a valid identity document upon check-in; for foreign clients a valid passport and for domestic clients, a valid identity card shall be accepted as proof of identity.

// 7. Clients checking into the apartment must be at least 18 years of age, except they are in company of a guardian.

// 8. Upon check-in, all clients must register through the registration form. 

// 9. Please note that any change in the reservation may change the rate and/or require payment of cancellation fees.

// 10. Group and Corporate clients may have some special arrangement based on their contract with us or based on management policies.

// 11. For reservations guaranteed with a form of payment at time of booking, apartments are held until check-out time (12:00 hours) the day following arrival.

// 12. For reservations not guaranteed with a form of payment at time of booking, apartments are held until set cancellation time per the rules of the reservation.  In the event more clients arrive than can be accommodated due to overbooking or an unforeseen circumstance, we may be unable to hold apartment consistent with this hold policy, we will attempt to accommodate clients, at its expense, at a comparable apartment within our management, which may cost more or less depending on the price which will be communicated with the client before securing the new facility.,

         
        ],
      },
      {
        description: "",
        title: "Reservations Policies",
        values: [
            'Payment guarantees reservations',
            'In case of open reservation clients are expected to liaise with our managers/representatives to confirm availability.',
            'every payment must be confirmed by our representatives and receipt must be issued.',
            'Every payment must be made to the company’s account, any payment to individuals/agent will be at owner’s risk',
            'Inconclusive transaction will regarded as void'

        ]
    }
      

  ];
  return(<> 
  <div className="policies">
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
  <TheFooter token={token} />
  </>)
};

export default BookingPolicy;
