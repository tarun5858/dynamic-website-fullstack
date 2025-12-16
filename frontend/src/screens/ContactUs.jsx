import { FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DateTimeDropdowns from "../components/DateTimeDropdowns";
import GetInTouch from "../components/GetInTouch";
import SpeakWithExpertForm from "../components/SpeakWithExpertForm";
const ContactUs = () => {

        // 1. Create a function to push the event
const trackButtonClick = (buttonName) => {
  // Check if the dataLayer exists before pushing (safety check)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_button_click', // <-- 🚨 This is the Custom Event name GTM must listen for
      button_name: buttonName,      // Optional: Pass context like the button name
      page_path: window.location.pathname
    });
    console.log(`DataLayer push: custom_button_click - ${buttonName}`); // For debugging
  }
};

  return (
    <>
      <GetInTouch></GetInTouch>

      <section className="speak-to-expert section-padding " id="faq-sec">
        <div className="container container-lg">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-12">
              <div
                className="section-title"
                data-wow-duration="1500ms"
                data-wow-delay="00ms"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "self-start",
                }}
              >
                <h2>FAQs</h2>
                <p style={{ textAlign: "left" }}>
                  Have questions about Prehome and its services? Find answers to
                  common queries below.
                </p>
              </div>
            </div>
            <div className="col-md-8 col-sm-6 col-12">
              <div className="faq-accordion">
                <div className="accordion" id="accordion">
                  <div className="accordion-item">
                    <h4 className="">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                        aria-controls="faq1"
                      >
                        Financial Understanding
                      </button>
                    </h4>
                    <div
                      id="faq1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <h4>
                          Q: How does Prehome help me build financial stability?
                        </h4>
                        <p>
                          A: Prehome provides financial guidance and counseling
                          to help you build your financial resources and savings
                          in order to become a fully-eligible homeowner in 2
                          years. We stay with you during your rental journey
                          while enabling you to be financially responsible and
                          make you ready to buy them home when you want to. Its
                          tech enabled process is further designed to help you
                          navigate the transition from being a renter to being
                          an owner.
                        </p>
                        <h4>
                          Q. What are the costs involved in signing up an
                          apartment with Prehome?{" "}
                        </h4>
                        <p>
                          A: The entire Prehome program is based on a bedrock of
                          trust and transparency. All the costs are declared
                          upfront for the renter to make an objective decision
                          of getting into the program. For the renter, the
                          following are the costs.
                        </p>
                        <ul>
                          <li>
                            A nominal finder’s fee towards Prehome once you
                            become eligible for the program
                          </li>
                          <li>
                            The monthly rents that are payable till the end of
                            the tenure
                          </li>
                          <li>
                            A security deposit that has to be paid upfront
                            towards the apartment
                          </li>
                          <li>Legal and financial due diligence fees if any</li>
                          <li>
                            A success fee at the end of the tenure provided
                            Prehome has enabled you to transition from a renter
                            to being an owner
                          </li>
                        </ul>
                        <h4>
                          Q: What is the security deposit required to rent an
                          apartment with Prehome?
                        </h4>
                        <p>
                          A: The security deposit required to rent an apartment
                          with Prehome may vary based on the property and
                          location, but typically it is equivalent to a few
                          months' rent.
                        </p>
                        <h4>
                          Q: Are there any hidden costs or fees associated with
                          renting an apartment with Prehome?
                        </h4>
                        <p>
                          A: No, there are no hidden costs or fees associated
                          with renting an apartment with Prehome. All costs and
                          fees are disclosed upfront.
                        </p>
                        <h4>
                          Q: Is there a possibility of a rent increase during
                          the rental period
                        </h4>
                        <p>
                          A: No, the rental rate is locked in for the duration
                          of the rental period, ensuring that customers can plan
                          their finances accordingly.
                        </p>
                        <h4>
                          Q: How does Prehome help me build financial stability
                          and become a homeowner?
                        </h4>
                        <p>
                          A: PreHome stays through the renters journey enabling
                          them with financial education and counseling, credit
                          score improvement advice, and access to resources that
                          can help these renters build financial stability and
                          become homeowners within the tenure.
                        </p>
                        <h4>
                          Q: Do I have to make a down payment to sign up for
                          Prehome?
                        </h4>
                        <p>
                          A: No, you do not have to make a down payment to sign
                          up for Prehome. You only need to pay the monthly rent
                          for the apartment you choose.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                        aria-controls="faq1"
                      >
                        Property Related Understanding
                      </button>
                    </h4>
                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <h4>Q: What kind of properties does Prehome offer?</h4>
                        <p>
                          A: Prehome offers pre-selected ready-to-move-in
                          apartments with high intrinsic value for rent,
                          enabling you to move into your dream home right away.
                        </p>
                        <h4>
                          Q: What amenities are included in the apartment?
                        </h4>
                        <p>
                          A: The amenities included in the apartment may vary
                          based on the property and location. However, Prehome's
                          properties are typically in societies with existing
                          habitation and all the basic amenities are provided
                          for.
                        </p>
                        <h4>
                          Q: Can I customize the apartment I rent through
                          Prehome?
                        </h4>
                        <p>
                          A: The Prehome program is designed to offer you
                          ready-to-move-in apartments with flexibility to
                          customize it your way. You have the freedom to upgrade
                          your wardrobe, paint the walls or get a pet.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                        aria-controls="faq1"
                      >
                        Rent to Own Program
                      </button>
                    </h4>
                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <h4>Q: How does Prehome work?</h4>
                        <p>
                          A: Prehome enables you to move into your dream home
                          today as a renter and through a financially beneficial
                          rental plan over the tenure make you a fully-eligible
                          homeowner. The prehome program offers the benefit of
                          locking in the property's value on day 1, allowing the
                          benefits of capital appreciation to flow to you when
                          you are ready to buy the house after the tenure.
                        </p>
                        <h4>Q: How does the rent-to-own program work?</h4>
                        <p>
                          A: PreHome's rent-to-own program allows customers to
                          rent a ready-to-move-in apartment with the option to
                          purchase it after the rental period is over. During
                          the rental period, customers can build up their
                          savings in order to have the ability to buy the home
                          when they are ready at the end of the tenure.
                        </p>
                        <h4>
                          Q: What is the minimum and maximum rental period for
                          Prehome's rental program?
                        </h4>
                        <p>
                          A: The rental period may vary based on the property
                          and location, but typically, Prehome offers a minimum
                          rental period of 2 years and a maximum rental period
                          of 3 years.
                        </p>
                        <h4>
                          Q: What is the process for purchasing the apartment
                          after the rental period is over?
                        </h4>
                        <p>
                          A: At the end of the rental period, customers have the
                          option to purchase the apartment at a locked-in price,
                          which is specified right at the time of renting the
                          apartment.
                        </p>
                        <h4>
                          Q: What if I am unable to continue with the Prehome
                          program?
                        </h4>
                        <p>
                          A: The Prehome program is designed to offer you
                          flexibility to decide on your commitment to home
                          ownership. The program has two phases, a rental phase
                          and the phase that provides the person with the option
                          to choose to unlock ownership after a fixed tenure.
                          You have the option to opt out in case you are unable
                          to continue with the program.
                        </p>
                        <h4>Q. Is the Prehome program like a loan?</h4>
                        <p>
                          A: No, loan providing institutions (usually banks and
                          NBFCs) allow you to borrow money to purchase a home.
                          These institutions require you to pay a down payment
                          and over time you pay back the institutions along with
                          floating rate interests that these institutions keep
                          changing over time. With Prehome, you are not taking a
                          loan, but choosing a new path to home ownership. Our
                          investors/partners own the home while allowing you to
                          graduate from being a renter to a homeowner. There's
                          no debt to repay or interest charged as you haven't
                          borrowed anything from them.
                        </p>
                        <h4>Q. What if Prehome goes out of business?</h4>
                        <p>
                          A: The Prehome program is designed to protect the home
                          and your path to home ownership irrespective of the
                          least possible outcomes. The agreements you sign are
                          designed to protect you from such outcomes.
                        </p>
                        <h4>Q. Is the Prehome model different from renting?</h4>
                        <p>
                          A: Principally, Prehome isn’t much different from
                          renting in practice. However, a lot of features of the
                          program are designed specifically to enable you to be
                          a homeowner. Unlike renting, you cannot be asked to
                          leave at any point of time as long as you're paying
                          rent and not breaching the contract.
                          <br />
                          Additionally with Prehome, you get the following
                          benefits over traditional rentals.
                        </p>
                        <uL>
                          <li>
                            You have the freedom to upgrade your wardrobe, paint
                            the walls or get a pet.{" "}
                          </li>
                          <li>
                            Transparent pricing with clear contracts and knowing
                            exactly what you pay for{" "}
                          </li>
                          <li>
                            Option to lock in price and save towards your down
                            payment till when you are ready to buy
                          </li>
                        </uL>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                        aria-controls="faq1"
                      >
                        Eligibility
                      </button>
                    </h4>
                    <div
                      id="faq4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <h4>
                          Q: What are the eligibility criteria to rent an
                          apartment with PreHome?
                        </h4>
                        <p>
                          A: Prehome is designed to help renters become eventual
                          owners. The eligibility criteria may vary based on the
                          property and location, but typically, PreHome requires
                          renters to have a stable income and a good credit
                          score. We will also do an industry-standard check on
                          your eligibility including reference checks.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="speak-to-expert  pt-20 d-none" id="speak">
        <div className="container container-lg">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-12">
              <div
                className="section-title"
                data-wow-duration="1500ms"
                data-wow-delay="00ms"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "self-start",
                  textAlign: "left",
                }}
              >
                <h2>Speak with our expert</h2>
              </div>
            </div>

            <div className="col-md-8 col-sm-6   contact-form  ">
              <form id="appointment-form" className="row">
                <input type="hidden" name="oid" value="00DC40000026yrZ" />
                <input
                  type="hidden"
                  id="company"
                  name="company"
                  value="Default company"
                />
                <input
                  type="hidden"
                  name="lead_source"
                  value="Speak with our expert"
                />
                <input
                  type="hidden"
                  name="retURL"
                  value="https://www.prehome.in/thank-you"
                />
                <div className="col-md-6  ">
                  <div className="single-personal-info">
                    <label for="fname1">Name</label>
                    <input
                      type="text"
                      name="last_name"
                      id="fname1"
                      className="border-only"
                    />
                  </div>
                </div>
                <div className="col-md-6  ">
                  <div className="single-personal-info">
                    <label for="email1">Email or Phone number</label>
                    <input
                      type="text"
                      name="00NC4000001IArm"
                      id="text1"
                      className="border-only"
                    />
                  </div>
                </div>

                {/* <div className="col-md-6  ">
                                <div className="single-personal-info">
                                    <label for="next7Days">Date:</label>
                                    <div className="dropdown-date" id="next7DaysDropdown">
                                        <div className="dropdown-button-1" id="msg_date" onclick="toggleDropdowndate()">Block a date </div>
                                        <div className="dropdown-content-1 text-center p-2" id="next7DaysDropdownContent">
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="col-md-6   d-flex align-items-center ">
                                <div className="single-personal-info">
                                    <div className="dropdown" id="customDropdown" style={{width: "100%"}}>
                                        <label for="time" className="ml-3">Time:</label>
                                        <div className="dropdown-button-2"  id="msg_time" onclick="toggleDropdown()">Block a timeslot</div>
                                        <div className="dropdown-content-2 text-justify p-4 " id="dropdownContents">                                  
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('10:00 am')">10:00 am</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('10:30 am')">10:30 am</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('11:00 am')">11:00 am</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('11:30 am')">11:30 am</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('12:00 pm')">12:00 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('12:30 pm')">12:30 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('01:00 pm')">01:00 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('01:30 pm')">01:30 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('02:00 pm')">02:00 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('02:30 pm')">02:30 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('12:00 pm')">03:00 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('03:30 pm')">03:30 pm</div>
                                            <div className="dropdown-option-1 mt-1 mb-2" onclick="selectOption('04:00 pm')">04:00 pm</div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                <div className="col-md-12  ">
                  <DateTimeDropdowns></DateTimeDropdowns>
                </div>

                <div className="col-md-12 col-12 mb-3">
                  <button type="submit" className="submit-btn" onClick={() => trackButtonClick('Submit expert_session Form')}>
                    SCHEDULE
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal55"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="container  modal-dialog ">
                    <div className="modal-content">
                      <div className=" d-flex justify-content-center pt-5">
                        <div className="modal-body-1 "></div>
                      </div>
                      <div className="modal-header  d-flex justify-content-center">
                        <h6 className="modal-title" id="exampleModalLabel">
                          We’ll get in touch with you
                        </h6>
                      </div>
                      <div className="modal-body-2 d-flex justify-content-center text-center">
                        <h4>
                          We would also love to know your preferred location for
                          a new home
                        </h4>
                      </div>
                      <div className="footer justify-content-center text-center pt-3 pb-3">
                        <button type="button" className="submit-btn">
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <SpeakWithExpertForm></SpeakWithExpertForm>
    </>
  );
};
export default ContactUs;
