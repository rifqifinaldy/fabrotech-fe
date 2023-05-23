import Head from "next/head";
import styles from "../styles/Home.module.css";
import { IProducts } from "../types/product.type";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const response = await fetch("https://dummyjson.com/products");
  const json = await response.json();
  const data = json.products;
  return { props: { data } };
}

export default function Home(props: { data: IProducts[] }) {
  const { data } = props;
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Fabrotech FE-TEST</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data.map((data) => {
          const renderImages: any = (images: any) => {
            return images.map((image: any) => (
              <Image
                key={image}
                priority={true}
                width={200}
                height={100}
                src={image}
                alt={image}
              />
            ));
          };
          return (
            <div
              className={styles.card}
              key={data.id}
              onClick={() => push("/" + data.id)}
            >
              <h1 className={styles.cardTitle}>{data.title}</h1>
              <div className={styles.cardContent}>
                <Image
                  priority={true}
                  width={400}
                  height={200}
                  src={data.thumbnail}
                  alt={data.title}
                />
                <ul>
                  <li>Description : {data.description}</li>
                  <li>Price : {data.price}</li>
                  <li>Discount : {data.discountPercentage} %</li>
                  <li>Rating : {data.rating}</li>
                  <li>Stock : {data.stock}</li>
                </ul>
              </div>
              <div className={styles.cardImages}>
                {renderImages(data.images)}
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
