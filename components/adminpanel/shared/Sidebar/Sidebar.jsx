import classes from './sidebar.module.scss'
import SidebarItem from '@/components/adminpanel/shared/Sidebar/Item/SidebarItem';
import {useRouter} from 'next/navigation'

const Sidebar = () => {
    const router = useRouter()

    return (
        <div className={classes.sidebarWr}>
            <div className={classes.name}>
                <div className={classes.nameTitle}>
                    TwinSann
                </div>
            </div>
            <SidebarItem title="Всі товари" onClick={() => router.push('/adminpanel/products')} />
            <SidebarItem title="Товари без категорії" onClick={() => router.push('/adminpanel/products/nullcategory')} />
            <SidebarItem title="Додати товар" onClick={() => router.push('/adminpanel/products/add')} />
            <SidebarItem title="Всі категорії" onClick={() => router.push('/adminpanel/categories')} />
            <SidebarItem title="Додати категорії" onClick={() => router.push('/adminpanel/categories/add')} />
            <SidebarItem title="Блог" onClick={() => router.push('/adminpanel/blog')} />
            <SidebarItem title="Відгуки блогу" onClick={() => router.push('/adminpanel/blog/reviews')} />
            <SidebarItem title="Замовлення" onClick={() => router.push('/adminpanel/orders')} />
            <SidebarItem title="Відгуки" onClick={() => router.push('/adminpanel/reviews')} />
            <SidebarItem title="SEO" onClick={() => router.push('/adminpanel/seo')} />
            <SidebarItem title="Налаштування" onClick={() => router.push('/adminpanel/settings')} />
        </div>
    );
};

export default Sidebar;
