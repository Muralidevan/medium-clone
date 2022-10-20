/* eslint-disable @next/next/no-img-element */
import Header from 'components/Header';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'typings.js';
import sanityClient, { urlFor } from '../lib/sanity.js';
import styles from '../styles/Home.module.css';

//array of type post
interface HomeProps {
  posts: [Post];
}

export default function Home({ posts }: HomeProps) {
  console.log('posts', posts);

  return (
    <div className='mx-auto max-w-7xl'>
      <Head>
        <title>Medium Blog</title>
        <meta name='description' content='Medium Blog app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className='flex justify-between bg-amber-400 h-96'>
          <div className='flex items-center w-8/12 p-4 '>
            <div className='ml-20'>
              {' '}
              <h1 className='my-4 font-normal font-alfaSlab text-8xl'>
                Stay curious.
              </h1>
              <p className='w-4/5 my-4 text-3xl font-normal font-yantramanav'>
                Discover stories, thinking, and expertise from writers on any
                topic.
              </p>
            </div>
          </div>
          <div className='items-center justify-center hidden w-4/12 md:flex '>
            <Image
              src='/medium-logo.png'
              alt='medium logo'
              width={150}
              height={150}
              className='object-contain w-10 cursor-pointer'
            />
          </div>
        </div>

        {/* posts */}
        <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6'>
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              {/* Using group for scaling group hover for main image */}
              <div className='overflow-hidden border rounded-lg cursor-pointer group'>
                <img
                  className='object-cover w-full transition-transform duration-200 ease-in-out h-60 group-hover:scale-105'
                  src={urlFor(post.mainImage).url()!}
                  alt=''
                />
                <div className='flex justify-between p-5 bg-white '>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-xs'>
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  {/* exclamation for not null */}
                  <img
                    src={urlFor(post.author.image).url()!}
                    alt=''
                    className='w-12 h-12 rounded-full'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Medium</footer>
    </div>
  );
}
export async function getServerSideProps() {
  const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  author -> {
  name,
image
},
description,
mainImage
}`;
  const posts = await sanityClient.fetch(query);
  console.log('posts', posts);
  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  };
}
