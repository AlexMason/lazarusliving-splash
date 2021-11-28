import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/dist/client/router';
import { Fragment, useState, useEffect, useContext } from 'react'
import { CartContext } from '../contexts/CartContext';

export default function GivingDonateModal({ open, close }) {
  const router = useRouter();
  const cartContext = useContext(CartContext)

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [error, setError] = useState([]);
  let [validated, setValidated] = useState(false);

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
       https://www.paypal.com/donate/?first_name=${firstName}&last_name=${lastName}&email=${email}&amount=${cartContext.total}&business=timwalbridge%40hotmail.com`;

      console.log(customDonateURL)
      router.push(customDonateURL);


      close();
    }
  }

  let validate = () => {
    let errors = [];

    if (firstName.length < 1) errors.push("Please fill out your first name");
    if (lastName.length < 1) errors.push("Please fill out your last name");
    if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) errors.push("Please enter a proper email.");

    return errors;
  }

  useEffect(() => {
    setError(validate());
  }, [firstName, lastName, email])

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
                    Your generosity is what allows us to execute our mission and help people.  Thank you for participating in our 2021 <a href="https://www.givingtuesday.org/" target="_blank" className="underline hover:text-black cursor-pointer">#GivingTuesday</a> event.
                  </p>
                </div>

                {validated && error.length > 0 && <div className="mt-5">
                  <p className="text-base text-red-600 mx-2 text-center">
                    {error.map(err => {
                      return <p className="py-2">{err}</p>
                    })}
                  </p>
                </div>}

                <div className="text-center mt-5 text-xl">Total: ${cartContext.total}</div>

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

                <hr className="mt-5 mb-3" />

                <div className="mt-4 flex justify-end">
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
