import {FiChevronRight} from 'react-icons/fi';
import Link from 'next/link';
import styles from './breadcrumbs.module.scss';
import {Fragment} from "react";

const Breadcrumbs = ({links}) => {
    const linkLength = links.length;

    return (
        <div className={styles['breadcrumbs-container']}>
            {links?.map((link, index) => {
                    const isRoomCategory = link.href.endsWith("kimnaty");

                    if(isRoomCategory) return null;

                    return (
                        <Fragment key={index}>
                            {index + 1 !== links.length
                                ?
                                <Link href={link.href} className={styles['breadcrumb-link']}>
                                    {link.text}
                                </Link>
                                :
                                <span className={styles['breadcrumb-link']}>
                                {link.text}
                            </span>

                            }

                            {index + 1 < linkLength &&
                                <FiChevronRight size={16} className={styles['breadcrumb-icon']}/>
                            }
                        </Fragment>
                    )
            }
            )}
        </div>
    );
};

export default Breadcrumbs;
