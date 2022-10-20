/* eslint-disable @next/next/no-img-element */
import Header from 'components/Header';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PortableText from 'react-portable-text';
import { Post } from 'typings.js';
import sanityClient, { urlFor } from '../../lib/sanity.js';

interface Props {
  post: Post;
}
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  console.log('post', post);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('data', data);
    fetch('/api/createcomment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log('data', data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log('err', err);
        setSubmitted(false);
      });
  };
  return (
    <main>
      <Header />
      <img
        className='object-cover w-full h-40'
        alt=''
        src={urlFor(post.mainImage).url()!}
      />
      <article className='max-w-3xl p-5 mx-auto'>
        <h1 className='mt-10 mb-3 text-3xl'>{post.title}</h1>
        <h2 className='mb-2 text-xl font-light text-gray-500'>
          {post.description}
        </h2>
        <div className='flex items-center space-x-2'>
          <img
            className='w-10 h-10 rounded-full'
            src={urlFor(post.author.image).url()!}
            alt=''
          />
          <p className='text-sm font-extralight'>
            Blog post by{' '}
            <span className='text-green-500'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className='mt-10 '>
          <PortableText
            className=''
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            projectId={process.env.NEXT_PUBLIC_SANITY_DATASET}
            serializers={{
              h1: (props: any) => (
                <h1 className='my-5 text-2xl font-bold' {...props} />
              ),
              h2: (props: any) => (
                <h1 className='my-5 text-xl font-bold' {...props} />
              ),

              li: ({ children }: any) => (
                <li className='ml-4 list-disc'>{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className='text-blue-500 hover:underline'>
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <img
          className='object-cover'
          src={urlFor(post.mainImage).url()!}
          alt=''
        />
      </article>
      <hr className='max-w-lg mx-auto my-5 border-orange-500' />
      {submitted ? (
        <div className='flex flex-col max-w-2xl p-10 mx-auto my-10 text-white bg-orange-500 rounded '>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <><form
            className='flex flex-col max-w-2xl p-5 mx-auto mb-10'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className='text-sm text-orange-500'>Enjoyed this article</h3>
            <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
            <hr className='py-3 mt-2' />
            <input
              {...register('_id')}
              type='hidden'
              name='_id'
              value={post._id} />
            <label className='block mb-5' htmlFor=''>
              <span className='text-gray-700'>Name</span>
              <input
                className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-orange-500 focus:ring ring-1'
                placeholder='Virat Kohli'
                type='text'
                {...register('name', { required: true })} />
            </label>
            <label className='block mb-5' htmlFor=''>
              <span className='text-gray-700'>Email</span>
              <input
                className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-orange-500 focus:ring ring-1'
                placeholder='Virat Kohli'
                type='email'
                {...register('email', { required: true })} />
            </label>{' '}
            <label className='block mb-5' htmlFor=''>
              <span className='text-gray-700'>Comment</span>
              <textarea
                className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-textarea ring-orange-500 focus:ring ring-1'
                placeholder='Virat Kohli'
                rows={8}
                {...register('comment', { required: true })} />
            </label>{' '}
            <div className='flex flex-col p-5'>
              {errors.name && (
                <p className='text-red-500'>The Name Field is Required!</p>
              )}
              {errors.comment && (
                <p className='text-red-500'>The Comment Field is Required!</p>
              )}
              {errors.email && (
                <p className='text-red-500'>The Email Field is Required!</p>
              )}
            </div>
            <input
              className='px-4 py-2 font-bold text-white bg-orange-500 rounded shadow cursor-pointer hover:bg-orange-400 focus:shadow-outline focus:outline-none'
              type='submit' />
          </form>
            {/* // comments */}
            <div className='flex flex-col max-w-2xl p-10 mx-auto my-10 space-y-2 rounded shadow shadow-orange-500'>
              <h3 className='text-4xl'> Comments</h3>
              <hr className='pb-2'/>
              {post.comments.map((comment)=>(
              <div key={comment._id}>
                <p className='text-orange-500'>{comment.name} : {comment.comment}</p>
              </div>))}
            </div></>
      )}
    </main>
  );
};

export default Post;

// 1.which pages to prepare
export const getStaticPaths = async () => {
  // prefetch all the routes
  const query = `*[_type == "post"]{
  _id,
  slug{
  current},
 
}`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };

  // [{params: {slug:'post-1'}}]
};
// 2.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,                                         
    title,
    author-> {
      name,
      image
},
'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
}
`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  // notFound:true triggers fallback blocking in getStaticPaths
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
    // which enables ISR after 60 seconds updates the old cache
    revalidate: 60,
  };
};
