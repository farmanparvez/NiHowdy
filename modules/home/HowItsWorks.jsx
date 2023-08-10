import { Button } from "antd"

const HowItsWorks = () => {
    const data = [
        { id: '1', title: 'Look up drug pricing', desc: 'Easily search for your medication, compare prices, and unlock the best deals at pharmacies near you. Take control of your prescription expenses and keep more money in your pocket.' },
        { id: '2', title: 'Show Membership Card to Pharmacist', desc: 'Simply show your NiHowdy savings card to your pharmacist and watch your prescription costs shrink. We ensure that you will receive the most affordable price available' },
        { id: '3', title: 'Save and Earn Bitcoin', desc: "By using NiHowdy’s savings card, you not only secure unbeatable deals on medications, but you also earn valuable Bitcoin rewards with every purchase. Enjoy the perks of earning digital currency for your everyday needs." }
    ]
    return (
        <div className="md:p-10 py-8 px-5 bg-csBGSmoke text-csTextColor-1 ">
            <div className='pb-6 font-semibold	text-2xl max-sm-w-[70%] sm:w-[70%] mx-auto'>
                How it Works
            </div>
            <div className="mx-auto">
                <div className="flex flex-wrap gap-10 min-[1050px]:justify-center  mx-auto">
                    {data?.map((res, index) => <div key={index} className="lg:w-[300px] max-lg:min-w-[300px] max-[1050px]:grow">
                        <div>
                            <div className="bg-[#F2F4FE] w-[64px] h-[64px] rounded-full flex justify-center items-center max-sm:mb-3">
                                <span className="text-csBG font-bold text-[32px]">{res.id}</span>
                            </div>
                        </div>
                        <div >
                            <div className="font-semibold csTextColor-1 text-[20px]">{res.title}</div>
                            <div className="text-[16px] csTextColor-1">
                                {res.desc}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center pt-10">
                <Button type='primary'><span >Get Savings Card Now</span></Button>
            </div>
        </div>
    )
}

export default HowItsWorks