export default function FAQ() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Frequently Asked Questions</h1>
      <div className="mb-6">
        <h2 className="font-semibold text-lg">What is UniLink?</h2>
        <p className="text-gray-700">UniLink is a centralized platform for Sri Lankan university students to access academic resources, events, and peer support.</p>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-lg">Who can join?</h2>
        <p className="text-gray-700">Any student from a Sri Lankan university can join using their university email.</p>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-lg">Is it free?</h2>
        <p className="text-gray-700">Yes! UniLink is free for all students.</p>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-lg">How do I upload notes or events?</h2>
        <p className="text-gray-700">After logging in, go to the Academic Repository or Event Hub and use the upload/post buttons.</p>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-lg">How is my data protected?</h2>
        <p className="text-gray-700">We use secure authentication and never share your data with third parties.</p>
      </div>
    </div>
  );
} 