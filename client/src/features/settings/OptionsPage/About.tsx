

const About = () => {
    return (
        <div className="px-3">
            <div className="text-base">
                <p className="justify-between flex border-b py-5">
                    <span>Application Version</span> 1.0.0
                </p>
                <p className="justify-between flex border-b py-5">
                    <span>Developed by</span> onimusha.dev
                </p>
                <p className="justify-between flex border-b py-5">
                    <span>License</span> MIT License
                </p>
                <div className="justify-between items-center flex border- py-3">
                    Terms of Use
                    <a target="_blank" href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html?locale=en_US"
                        className="bg-accent/5 select-none hover:bg-accent rounded-full border-accent border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer"
                    >View</a>
                </div>
                <div className="justify-between items-center flex border- py-3">
                    Privacy Policy
                    <a target="_blank" href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html?locale=en_US"
                        className="bg-accent/5 select-none hover:bg-accent rounded-full border-accent border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer"
                    >View</a>
                </div>
            </div>
        </div>
    );
}

export default About