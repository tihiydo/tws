'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import classes from './InstagramFeed.module.scss';
import Button from '../../../../shared/UI/Button/Button.jsx';
import Feed from './Feed/feed';

const InstagramFeed = () => {
  const [feeds, setFeedsData] = useState([]);
  const [limit, setLimit] = useState(9);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    // this is to avoid memory leaks
    const abortController = new AbortController();
    async function fetchInstagramPost() {
    // console.log(process.env.INSTA_TOKEN)
      try {
        fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${limit}&access_token=${"IGQVJWVGxwelBlNUJEY2JPVWVUU3JLcXJyNmdfQUw4aW13ZA2U0dzhibXN1bno0WVFMZADhxUktMSlBJYzEwaWZAudXBFLTVkckVNZAnVjQTNfTTQ2MXNuV1V5V2xCWnRZAUkFqLUVmbElQRFVxYzdOUmhIZAAZDZD"}`
        )
          .then((resp) => resp.json())
          .then((resp) => setFeedsData(resp.data));
      } catch (err) {
        console.log('error', err);
      }
    }

    // manually call the fecth function
    fetchInstagramPost();

    return () => {
      // cancel pending fetch request on component unmount
      abortController.abort();
    };
  }, [limit, query]);

  return (
    <div className={classes.instBox}>
      <span>Ми в інстаграм: @twin_sann</span>
      <div className={classes.container}>
        {feeds.map((feed) => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </div>
      <Button
        style={{ margin: '0px auto' }}
        text="Показати ще"
        onClick={() => {
          setLimit(limit + 3);
        }}
      />
    </div>
  );
};

export default InstagramFeed;
