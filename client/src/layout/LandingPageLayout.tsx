import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PiSparkle } from 'react-icons/pi'

const LandingPageLayout : React.FC = () => {
    return (
        <div className='relative'>
            <Header />
            <Outlet />

                  {/* ----- CTA: Step into the future ----- */}
<section className="w-full">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <h2 className="text-center text-2xl sm:text-6xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-slate-900">
      Step into the future of
      <br />
      <span className="block">DM Automations</span>
    </h2>

    <p className="mx-auto mt-6 max-w-4xl text-center text-xl sm:text-lg text-slate-500">
      Join thousands of creators &amp; brands using FUMA to grow engagement,
      build <br /> connections, &amp; monetize their following.
    </p>

    <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
      <a
        href="#"
        className="group inline-flex items-center gap-3 rounded-[22px] sm:rounded-[28px] 
                   bg-violet-700 text-white  font-semibold
                   px-6 py-3 sm:px-4 sm:py-2
                   shadow-[0_12px_30px_rgba(109,40,217,0.35)]
                   ring-1 ring-violet-800/40 hover:brightness-110 transition"
      >
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/15">
          <PiSparkle className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        Start For Free
      </a>
      <a
        href="#"
        className="inline-flex items-center justify-center rounded-[22px] sm:rounded-[28px]
                   bg-white text-slate-900  font-semibold
                   px-6 py-3 sm:px-7 sm:py-3
                   ring-1 ring-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.06)]
                   hover:ring-slate-300 transition"
      >
        See Pricing
      </a>
    </div>
  </div>
</section>

            <Footer />
        </div>
    )
}

export default LandingPageLayout