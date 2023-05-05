import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title> React Meetups </title>
        <meta 
        name="description"
        content="Browse a huge list of highly active React Meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://JamesDimacali:Shadowzebra421@cluster0.sdom5mf.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
