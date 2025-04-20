<template>
    <!-- 左侧菜单 -->
    <div class="menu w-[200px] bg-gray-800 p-4">
        <!-- 菜单顶部图标和描述 -->
        <div class="logo text-gray-300 flex items-center">
            <i class="fab fa-robot text-gray-300 mr-2 text-[25px]">J</i>
            <span class="text-gray-300 text-base">前端脚手架项目</span>
        </div>
        <!-- 菜单导航 -->
        <div class="left-container">
            <dl v-for="(menu, index) of menus" :key="index">
                <dt @click="handle(menu)">
                    <section>
                        <el-icon><Menu /></el-icon>
                        <span class="text-md">{{ menu.title }}</span>
                    </section>
                    <section>
                        <el-icon><ArrowDown /></el-icon>
                    </section>
                </dt>
                <dd v-show="menu.activate" :class="{ activate: cmenu.activate }" v-for="(cmenu, key) of menu.children"
                    :key="key">
                    <span>{{ cmenu.title }}</span>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义菜单类型和数据
interface IMenuItem {
    title: string,  // 菜单名称
    activate?: boolean,  // 是否选中
}
interface IMenu extends IMenuItem {
    children?: IMenuItem[]
}
const menus = ref<IMenu[]>(
    [
        {
            title: '错误页面', activate: true,
            children: [
                { title: '404错误', activate: true },
                { title: '403错误' },
                { title: '500错误' }
            ]
        },
        {
            title: '代码编辑器',
            children: [
                { title: 'Markdown' },
                { title: '富文本' }
            ]
        },
    ])

// 重置菜单的方法（将所有子菜单都进行折叠）
const resetMenus = () => {
    menus.value.forEach(pmenu => {
        pmenu.activate = false;
        pmenu.children?.forEach(cmenu => {
            cmenu.activate = false
        })
    })
}

// 菜单的处理事件
const handle = (pmenu: IMenuItem, cmenu?: IMenuItem) => {
    resetMenus();
    pmenu.activate = !pmenu.activate
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

                    i {
                        @apply mr-2 text-sm;
                    }
                }
            }

            dd {
                @apply py-3 pl-4 my-2 text-white rounded-md cursor-pointer duration-300 hover:bg-violet-500;

                &.activate {
                    @apply bg-violet-700;
                }
            }
        }
    }
}
</style>