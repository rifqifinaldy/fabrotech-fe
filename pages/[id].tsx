import React from "react";
import { IProducts } from "../types/product.type";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const response = await fetch("https://dummyjson.com/products/" + id);
  const data = await response.json();
  return { props: { data } };
}

export default function DetailPages(props: { data: IProducts }) {
  const { data } = props;

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
    <div className={styles.card} key={data.id}>
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
      <div className={styles.cardImages}>{renderImages(data.images)}</div>
    </div>
  );
}
