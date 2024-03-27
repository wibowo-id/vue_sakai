<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from './composables/layout';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirmPopup = useConfirm();
const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const user = useUserStore();
const displayConfirmation = ref(false);

onMounted(() => {
    bindOutsideClickListener();
});
onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    // topbarMenuActive.value = false;
    // router.push('/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };

        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = (no) => {
    if(no === 0) {
        toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        displayConfirmation.value = false;
    } else if(no === 1) {
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        displayConfirmation.value = false;
        user.unsetUser();
        // const authCookie = useCookie('userStore')
        // authCookie.value = null
        // return navigateTo('/auth/login');
        // router.push('/auth/login');
    }
};

const items = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
            toast.add({ severity: 'success', summary: 'Updated', detail: 'Redirect to Profile', life: 3000 });
        }
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            openConfirmation()
        }
    },
];
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>SiTrendi</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <SplitButton :label="user.user.name" icon="pi pi-check" menuButtonIcon="pi pi-user" @click="onSettingsClick" :model="items" />
            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Are you sure you want to proceed?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation(0)" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeConfirmation(1)" class="p-button-text" autofocus />
                </template>
            </Dialog>
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
            </button>
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-bell"></i>
                <span>Notification</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
