<template>
  <PageWrapper :title="isUpdate ? '编辑首页配置' : '新增首页配置'" contentFullHeight @back="handleBack">
    <template #extra>
      <a-button @click="handleBack">取消</a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading">保存</a-button>
    </template>

    <div class="p-4">
      <BasicForm @register="registerForm" />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { formSchema } from './home.data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';

  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const isUpdate = ref(false);

  // 表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseRowStyle: { marginTop: '10px' },
    schemas: formSchema,
    showActionButtonGroup: false,
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  });

  // 返回列表页
  function handleBack() {
    router.push('/system/homeConfig');
  }

  // 加载数据（编辑模式）
  async function loadData(id: string) {
    try {
      loading.value = true;
      const result = await queryById({ id });
      if (result) {
        const record = { ...result };
        // 处理用户类型
        if (record.relationType == 'USER') {
          record.userCode = record.roleCode;
        }
        // 处理默认类型
        if (record.relationType == 'DEFAULT') {
          record.roleCode = '';
        }
        await setFieldsValue(record);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      message.error('加载数据失败');
    } finally {
      loading.value = false;
    }
  }

  // 提交表单
  async function handleSubmit() {
    try {
      // const values = await validate();
      loading.value = true;

      // 处理提交数据
      // if (values.relationType == 'USER') {
      //   values.roleCode = values.userCode;
      // }
      // if (values.relationType == 'DEFAULT') {
      //   values.roleCode = 'DEF_INDEX_ALL';
      // }

      // await saveOrUpdate(values, isUpdate.value);
      // message.success(isUpdate.value ? '编辑成功' : '新增成功');
      handleBack();
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败');
    } finally {
      loading.value = false;
    }
  }

  // 初始化
  onMounted(async () => {
    await resetFields();
    const id = route.query.id as string;
    if (id) {
      isUpdate.value = true;
      await loadData(id);
    }
  });
</script>

<style lang="less" scoped>
  :deep(.ant-page-header) {
    padding: 12px 16px;
  }
</style>
