<template>
    <div class="admin-menu" :class="{ close: menuStore.close.value }">
        <!-- 左侧菜单 -->
        <div class="menu w-[200px] bg-gray-800">
            <!-- 菜单顶部图标和描述 -->
            <div class="logo">
                <el-icon class="text-gray-300 mr-2">
                    <GoldMedal />
                </el-icon>
                <span class="text-gray-300 text-base">前端脚手架项目</span>
            </div>
            <!-- 菜单导航，通过方式一获取数据 -->
            <!-- <div class="left-container">
            <dl v-for="(menu, index) of menu.menus" :key="index">
                <dt @click="handle(menu)">
                    <section>
                        <el-icon class="text-gray-300 mr-2">
                            <component :is="menu.icon" />
                        </el-icon>
                        <span class="text-md">{{ menu.title }}</span>
                    </section>
                    <section>
                        <el-icon class="duration-300" :class="{ 'rotate-180': menu.isClick }">
                            <ArrowDown />
                        </el-icon>
                    </section>
                </dt>
                <dd v-show="menu.isClick" :class="{ activate: cmenu?.isClick }"
                    v-for="(cmenu, key) of menu.children" :key="key" @click="handle(menu, cmenu)">
                    <span>{{ cmenu?.title }}</span>
                </dd>
            </dl>
        </div> -->
            <!-- 菜单导航，通过方式二获取数据 -->
            <div class="left-container">
                <dl>
                    <dt :class="{ 'bg-violet-600 text-write p-3 rounded-md': $route.name === 'admin.home' }"
                        @click="router.push({ name: 'admin' })">
                        <section>
                            <el-icon>
                                <HomeFilled />
                            </el-icon>
                            <span>回到首页</span>
                        </section>
                    </dt>
                </dl>
                <dl v-for="(menu, index) of menuStore.menus.value" :key="index">
                    <dt @click="menuStore.toggleParentMenu(menu)">
                        <section>
                            <el-icon class="text-gray-300 mr-2">
                                <component :is="menu.icon" />
                            </el-icon>
                            <span class="text-md">{{ menu.title }}</span>
                        </section>
                        <section>
                            <el-icon class="duration-300" :class="{ 'rotate-180': menu.isClick }">
                                <ArrowDown />
                            </el-icon>
                        </section>
                    </dt>
                    <dd :class="!menu.isClick || menuStore.close.value ? 'hidden' : 'block'">
                        <div :class="{ activate: cmenu?.isClick }" v-for="(cmenu, key) of menu.children" :key="key"
                            @click="handle(menu, cmenu)">
                            <span>{{ cmenu?.title }}</span>
                        </div>
                    </dd>

                </dl>
            </div>
        </div>
        <!--遮罩，在移动端的时候显示-->
        <div class="bg block md:hidden" @click="menuStore.toggleCollapse"></div>
    </div>
</template>

<script setup lang="ts">
import { IMenu } from '#/menu';
import router from '@/router';
// // 方式一：从Pinia全局状态中获取菜单内容
// import menuStore from '@/store/menuStore';
// const menu = menuStore();

// // 重置菜单的方法（将所有子菜单都进行折叠）
// const resetMenus = () => {
//     menu.menus.forEach(menu => {
//         menu.isClick = false;   // 将父菜单的激活状态设置为false
//         // 遍历子菜单，将子菜单路由的激活状态设置为false
//         menu.children?.forEach(cmenu => {
//             cmenu.isClick = false
//         })
//     })
// }

// // 菜单的处理事件，子路由的传递是可选的
// const handle = (pmenu: IMenu, cmenu?: IMenu) => {
//     resetMenus();
//     pmenu.isClick = true;
//     if (cmenu) {
//         cmenu.isClick = true;
//         // 点击子菜单后，进行路由的跳转
//         router.push({ name: cmenu.route });
//     }
// }

// 方式二：从全局的响应式对象中读取历史菜单内容
import menuStore from '@/composables/menu';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
menuStore.init()

const route = useRoute();
// 进行事件的监听，同时在页面初始的时候就执行一次监听
watch(route, () => {
    menuStore.setCurrentMenu(route);  // 点击回到首页时，将其他的子菜单缩起来
}, { immediate: true });

// 重置菜单的方法（将所有子菜单都进行折叠）
const resetMenus = () => {
    menuStore.menus.value.forEach(menu => {
        menu.isClick = false;   // 将父菜单的激活状态设置为false
        // 遍历子菜单，将子菜单路由的激活状态设置为false
        menu.children?.forEach(cmenu => {
            cmenu.isClick = false
        })
    })
}

// 菜单的处理事件，子路由的传递是可选的
const handle = (pmenu: IMenu, cmenu?: IMenu) => {
    resetMenus();
    pmenu.isClick = true;
    if (cmenu) {
        cmenu.isClick = true;
        // 点击子菜单后，进行路由的跳转
        router.push({ name: cmenu.route });
    }
}
</script>

<style lang="scss">
.admin-menu {
    @apply z-20;

    .menu {
        @apply h-full;

        .logo {
            @apply text-gray-300 flex items-center p-4
        }

        .left-container {
            dl {
                @apply text-gray-300 p-4 text-sm relative;

                dt {
                    @apply text-sm flex justify-between cursor-pointer items-center;

                    section {
                        @apply flex items-center;
                    }
                }

                dd {
                    div {
                        @apply py-3 pl-4 my-2 text-white rounded-md cursor-pointer duration-300 hover:bg-violet-500 bg-gray-700;

                        &.activate {
                            @apply bg-violet-700;
                        }
                    }
                }
            }
        }
    }
}

// 桌面端的样式
@media screen and (min-width: 768px) {
    .admin-menu {
        &.close {
            .menu {

                width: auto;

                .logo {
                    @apply justify-center;

                    .el-icon {
                        @apply mr-0;
                    }

                    span {
                        @apply hidden;
                    }
                }

                .left-container {
                    dl {
                        dt {
                            @apply flex justify-center;

                            section {
                                .el-icon {
                                    @apply mr-0;
                                }

                                span {
                                    @apply hidden;
                                }

                                &:nth-of-type(2) {
                                    @apply hidden;
                                }
                            }
                        }

                        &:hover {
                            dd {
                                @apply block absolute left-full top-[0px] w-[200px] bg-gray-700;
                            }
                        }
                    }
                }
            }
        }
    }
}

// 移动端的样式
@media screen and (max-width: 768px) {
    .admin-menu {
        @apply h-screen w-[200px] absolute left-0 top-0 z-50;

        .menu {
            @apply h-full z-50 absolute;

            .close {}
        }

        .bg {
            @apply bg-gray-700 opacity-75 z-40 w-screen h-screen absolute left-0 top-0;
        }

        &.close {
            @apply hidden;
        }
    }
}
</style>