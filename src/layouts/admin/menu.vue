<template>
    <!-- 左侧菜单 -->
    <div class="menu w-[200px] bg-gray-800 p-4">
        <!-- 菜单顶部图标和描述 -->
        <div class="logo text-gray-300 flex items-center">
            <el-icon class="text-gray-300 mr-2">
                <GoldMedal />
            </el-icon>
            <span class="text-gray-300 text-base">前端脚手架项目</span>
        </div>
        <!-- 菜单导航 -->
        <div class="left-container">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { IMenu } from '#/menu';
import router from '@/router';
import menuStore from '@/store/menuStore';

// 从全局状态中获取菜单内容
const menu = menuStore();

// 重置菜单的方法（将所有子菜单都进行折叠）
const resetMenus = () => {
    menu.menus.forEach(menu => {
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
.admin {
    .left-container {
        dl {
            @apply text-gray-300 text-sm;

            dt {
                @apply text-sm mt-6 flex justify-between cursor-pointer items-center;

                section {
                    @apply flex items-center;
                }
            }

            dd {
                @apply py-3 pl-4 my-2 text-white rounded-md cursor-pointer duration-300 hover:bg-violet-500 bg-gray-700;

                &.activate {
                    @apply bg-violet-700;
                }
            }
        }
    }
}
</style>