import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/dist/client/router';
import { Fragment, useState, useEffect } from 'react'

export default function DonateModal({ open, close }) {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(open);
  let [selectedAmt, setSelectedAmt] = useState(2);
  let [otherAmt, setOtherAmt] = useState(20)
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [error, setError] = useState([]);
  let [validated, setValidated] = useState(false);
  let donationAmounts = [250, 100, 30, 15, 5, "Other"];

  let handleSubmit = () => {
    setValidated(true);

    if (validate().length == 0) {
      /*
       https://www.paypal.com/donate/
       ?first_name=
       &last_name=
       &email=
       &amount=1000
       &business=timwalbridge%40hotmail.com
       &return=http%3A%2F%2Flazarusliving.org%2Fdonate%2F%3Fthanks%3Dtrue&notify_url=http%3A%2F%2Flazarusliving.org%2Fwp-content%2Fplugins%2Fseamless-donations%2Fpay%2Fpaypalstd%2Fipn.php&item_name=Donation&quantity=1&currency_code=USD&no_note=1&bn=SeamlessDonations_SP&  
       */

      let customDonateURL = `
       https://www.paypal.com/donate/?first_name=${firstName}&last_name=${lastName}&email=${email}&amount=${selectedAmt == 5 ? otherAmt : donationAmounts[selectedAmt]}&business=timwalbridge%40hotmail.com`;

      console.log(customDonateURL)
      router.push(customDonateURL);


      close();
    }
  }

  let validate = () => {
    let errors = [];

    if (selectedAmt == 5 && (otherAmt <= 0 || !parseInt(otherAmt))) errors.push("You must provide an amount to donate when selecting this option, otherwise pick one of the pretermined options below.");
    if (firstName.length < 1) errors.push("Please fill out your first name");
    if (lastName.length < 1) errors.push("Please fill out your last name");
    if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) errors.push("Please enter a proper email.");

    return errors;
  }

  useEffect(() => {
    setError(validate());
  }, [selectedAmt, otherAmt, firstName, lastName, email])

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => close()}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Donate
                </Dialog.Title>

                <div className="mt-5">
                  <p className="text-sm text-gray-500 mx-2">
                    Your generosity is what allows us to execute our mission and help people.  If you cannot contribute financially we do still have needs for volunteers and physical items such as clothes and non-perishable food.
                  </p>
                </div>

                {validated && error.length > 0 && <div className="mt-5">
                  <p className="text-base text-red-600 mx-2 text-center">
                    {error.map(err => {
                      return <p className="py-2">{err}</p>
                    })}
                  </p>
                </div>}

                <div className="flex flex-row flex-wrap text-center mt-5 mx-5">
                  {
                    donationAmounts.map((amt, idx) => {
                      return <div className="w-1/3 px-1">
                        <button className={"border-2 rounded-lg w-full my-1 p-2 "
                          + (selectedAmt == idx ? "border-gray-700 bg-black text-white" : "border-gray-500 hover:border-gray-700")}
                          onClick={() => setSelectedAmt(idx)}
                        >
                          {parseInt(amt) ? "$" + amt : amt}
                        </button>
                      </div>
                    })
                  }

                </div>
                {selectedAmt == 5 && <div className="mx-7 mt-1 float flex items-center justify-between">
                  <label>Amount</label>
                  <div className="border-gray-500 rounded-lg p-1.5 border-2 min-w-0">
                    <span>$</span>
                    <input
                      type="number"
                      placeholder="$20"
                      className="ml-1"
                      onChange={(e) => setOtherAmt(parseInt(e.target.value))}
                      value={otherAmt}
                    />
                  </div>
                </div>}

                <div>
                  <hr className="mt-5 mb-3" />
                  <div className="flex w-full justify-around gap-2">
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="">First Name</label>
                      <input type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className="border-gray-500 rounded-lg p-1.5 border-2 w-full" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="">Last Name</label>
                      <input type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className="border-gray-500 rounded-lg p-1.5 border-2 w-full" />
                    </div>
                  </div>
                  <div className="flex w-full justify-around gap-2">
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="">Email Address</label>
                      <input type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border-gray-500 rounded-lg p-1.5 border-2 w-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-400 hover:shadow-lg hover:ring-1 ring-black hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmit}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
