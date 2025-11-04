import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ServicesPage() {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      title: "Payroll & Finance Management",
      desc: "Automate payroll, tax, and compliance tasks with minimal effort.",
      features: [
        "Salary calculation and payslip generation",
        "Automatic tax and compliance tracking",
        "Multi-currency payroll support",
        "Bank/payment gateway integration",
      ],
    },
    {
      title: "Attendance & Time Tracking",
      desc: "Track time, attendance, and shifts across teams and locations.",
      features: [
        "Real-time attendance via app or biometric integration",
        "Automated overtime calculation",
        "Leave management system",
        "Integration with Google Calendar or Outlook",
      ],
    },
    {
      title: "Performance & Reviews",
      desc: "Help managers evaluate employee performance objectively.",
      features: [
        "KPI and OKR tracking",
        "Peer and 360° reviews",
        "Goal-setting dashboard",
        "Performance analytics and insights",
      ],
    },
    {
      title: "Recruitment & Onboarding",
      desc: "Streamline your entire hiring journey in one platform.",
      features: [
        "Job posting and application tracking",
        "Resume parsing and candidate ranking",
        "Offer letter automation",
        "Digital onboarding workflows",
      ],
    },
    {
      title: "Employee Self-Service",
      desc: "Empower employees to access and manage their information easily.",
      features: [
        "Profile and document management",
        "Payslip and tax form download",
        "Leave application tracking",
        "Employee helpdesk chatbot",
      ],
    },
    {
      title: "Reports & Analytics",
      desc: "Make data-driven decisions with insightful analytics.",
      features: [
        "Custom report builder",
        "Attendance and payroll trends",
        "Department-level insights",
        "Predictive attrition analysis (AI)",
      ],
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "₹499 / month",
      target: "Up to 50 employees",
      color: "blue",
      features: [
        "Attendance tracking",
        "Basic payroll automation",
        "Payslip generation",
        "Email support",
      ],
    },
    {
      name: "Growth",
      price: "₹1499 / month",
      target: "Up to 250 employees",
      color: "green",
      features: [
        "Performance reviews",
        "Recruitment tools",
        "Employee self-service",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      target: "250+ employees",
      color: "purple",
      features: [
        "AI-powered analytics",
        "Advanced integrations (Slack, Gmail, Zoom)",
        "Dedicated account manager",
        "Custom reports and SLA support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20 text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Our Services & Pricing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything your HR and management team needs — from payroll to
          performance.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceCategories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-blue-500"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {cat.title}
            </h2>
            <p className="text-gray-600 mb-4">{cat.desc}</p>
            <ul className="space-y-2">
              {cat.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Choose the Right Plan for You
          </h2>
          <p className="text-gray-500 mt-2">
            Simple pricing, transparent plans — no hidden fees.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {plans.map((plan, idx) => {
            const colorClasses = {
              blue: {
                border: "border-blue-200",
                bg: "bg-blue-50",
                text: "text-blue-700",
                accent: "text-blue-500",
                button: "bg-blue-600 hover:bg-blue-700",
              },
              green: {
                border: "border-green-400",
                bg: "bg-white",
                text: "text-green-700",
                accent: "text-green-500",
                button: "bg-green-600 hover:bg-green-700",
              },
              purple: {
                border: "border-purple-200",
                bg: "bg-purple-50",
                text: "text-purple-700",
                accent: "text-purple-500",
                button: "bg-purple-600 hover:bg-purple-700",
              },
            }[plan.color];

            return (
              <div
                key={idx}
                className={`relative ${colorClasses.bg} border ${
                  colorClasses.border
                } p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left ${
                  plan.popular
                    ? "border-2 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-6 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    MOST POPULAR
                  </div>
                )}

                <h3 className={`text-2xl font-bold ${colorClasses.text} mb-2`}>
                  {plan.name}
                </h3>
                <p className="text-gray-500 mb-4">{plan.target}</p>
                <p
                  className={`text-3xl font-extrabold ${colorClasses.text} mb-6`}
                >
                  {plan.price}
                </p>

                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${colorClasses.accent}`}
                      />{" "}
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 ${colorClasses.button} text-white rounded-lg font-medium transition`}
                  onClick={() => {
                    // show loading toast with spinner
                    const id = toast.loading("Preparing your signup page…", {
                      position: "top-right",
                      theme: "colored",
                    });

                    // wait 1.5s, then close toast & navigate
                    setTimeout(() => {
                      toast.update(id, {
                        render: "Redirecting now!",
                        type: "success",
                        isLoading: false,
                        autoClose: 1000,
                      });
                      setTimeout(() => navigate("/signup"), 1000);
                    }, 1500);
                  }}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to simplify your HR operations?
        </h2>
        <p className="text-lg mb-8 text-blue-100">
          Using talentFlow - Human Resource Management Software to manage
          employees smarter.
        </p>
        <button
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          onClick={() => {
            const id = toast.loading("Preparing your signup page…", {
              position: "top-right",
              theme: "colored",
            });
            setTimeout(() => {
              toast.update(id, {
                render: "Redirecting now!",
                type: "success",
                isLoading: false,
                autoClose: 1000,
              });
              setTimeout(() => navigate("/signup"), 1000);
            }, 1500);
          }}
        >
          Register
        </button>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
