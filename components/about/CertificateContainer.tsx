import Image from "next/image";

const CertificateContainer = () => {
  return (
    <div className="my-20">
        <h1 className="!text-2xl md:!text-4xl">Certificates</h1>
        <div className="flex flex-col md:flex-row gap-20 mt-10">
          <Image
            src="/web-dev.png"
            alt="certificate"
            width={250}
            height={200}
          />
          <Image
            src="/software-dev.jpg"
            alt="certificate"
            width={250}
            height={200}
          />
        </div>
      </div>
  );
};

export default CertificateContainer;