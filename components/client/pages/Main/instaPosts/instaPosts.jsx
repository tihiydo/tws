import Image from 'next/image';
import classes from './instaPosts.module.scss';
import { useTranslations } from 'next-intl';

const InstagramPosts = ({ posts }) => {
  const page = useTranslations("Index");
  const buttons = useTranslations("buttons")
  return (
    <div className={classes.postsBox}>
      <h3 className={classes.title}>{page("inst")} <a href="https://www.instagram.com/twin_sann/" target="_blank">@twin_sann</a></h3>
      <div className={classes['instagram-posts']}>
        {posts.map((post, index) => (
        <div className={classes['instagram-post']} key={index}>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            <div className={classes['instagram-post-media']}>
              {post.__typename === 'GraphImage' && (
                <Image
                  src={post.thumbnail}
                  alt={post.caption}
                  width={200}
                  height={200}
                />
              )}
              {post.__typename === 'GraphVideo' && (
                <video className={classes['instagram-post-video']} controls>
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className={classes['instagram-post-overlay']}>
                <span>
                  {
                    buttons("toPost")
                  }
                </span>
              </div>
            </div>
          </a>
        </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramPosts;
