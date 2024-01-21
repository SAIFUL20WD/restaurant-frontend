

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-4/12 my-8 text-center">
            <p className="text-yellow-500 mb-2">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase border-y-4 py-3">{heading}</h3>
        </div>
    );
};

export default SectionTitle;