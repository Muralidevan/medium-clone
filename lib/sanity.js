import createImageUrlBuilder from '@sanity/image-url';
import {
  createClient, createCurrentUserHook, createPortableTextComponent, createPreviewSubscriptionHook
} from 'next-sanity';
// import ReactTooltip from 'react-tooltip';

import { config } from './config';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
// Helper function for generating ImageUrls with only asset reference
// www.sanity.io/docs/image-url
 export const urlFor = (source) =>
  createImageUrlBuilder(config).image(source);

// Helper fn for using the current logged in user account

export const currentUser = createCurrentUserHook(config)

// export const imageBuilder = (source) =>
//   createImageUrlBuilder(config).image(source);

// export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization
// export const PortableText = createPortableTextComponent({
//   ...config,
//   // Serializers passed to @sanity/block-content-to-react
//   // (https://github.com/sanity-io/block-content-to-react)
//   serializers: {
//     types: {
//       code: (props) => (
//         <pre data-language={props.node.language}>
//           <code>{props.node.code}</code>
//         </pre>
//       ),
//     },
//   },
// });

export const sanityClient = createClient(config);

// export const previewClient = createClient({
//   ...config,
//   useCdn: false,
// });

// export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default sanityClient;
