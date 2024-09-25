import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            admin:'Admin',
            user:'User',
            group:'Group',
            usergroup:'User Group',
            home:'Home',
            workplace: 'Workplace',
            logs:'Logs',
            signout:'Sign Out',
            preferences:'Preferences',
            nomatch:'No matches',
            jobs:'Jobs',
            view:'View',
            Settings:'Settings',
            adduser:'Add User',
            addgroup:'Add User Group',
            normal_group:'Normal',
            admin_group:'Admins',
            email:'Email',
            status:'Status',
            username:'Username',
            createtime:'Create time',
            add:'Add',
            create:'Create',
            create_job:'Create a new Job',
            review_submit:'Review and Sumbit',
            basic_config:'Basic Configuration',
            output_s3:'Output S3 bucket',
            output_s3_desc:'The output S3 path to store the result files',
            csp:'CSP',
            select_csp_type:'Select CSP',
            csp_type:'CSP Type',
            alicloud:'Ali Cloud (In future)',
            alicloud_desc:'Create Job in Ali Cloud',
            aws_desc:'Create Job in AWS',
            aws:'AWS',
            china:'China',
            global:'Global',
            select_user_group:'Select User Group',
            aws_partition:'AWS Partition',
            password:'Password',
            confirm_password:'Confirm Password',
            csp_cred :'CSP Credentials',
            region:'Region',
            region_desc:'Select a region',
            vpc_config:'VPC Configure',
            vpc_id:'VPC ID',
            vpc_id_desc:'Input your existing VPC ID',
            sg_ids:"Security Group IDs",
            sg_ids_desc:"Input your exsting security group id,use comma(,) to split multiple values",
            auto_new_vpc:'Automatically create a new VPC',
            job_desc:'Job description',
            job_desc_long:'Enter Job description',
            entity_config:'Entity Configure',
            instance_type:'Instance Type',
            input_instance_type_desc:'Please input directly if not in above options',
            job_type:'Job Type',
            select_job_type:'Select job type',
            pts_desc:'PTS benchmark test',
            pts:'PTS',
            sysbench:'Sysbench',
            sysbench_desc:'Sysbench benchmark test',
            subnet_ids:'Subnet IDs',
            subnet_ids_desc:'Input Subnet ID, use comma(,) to split multiple values',
            next:'Next',
            cancel:'Cancel',
            submit:'Submit',
            previous:'Previous',
            optional:'Optional',
            ec2_os_type:'OS Type',
            ec2_instance_type:'EC2 Instance Type',
            os_type_desc:'Select OS Type',
            sumbit_job_success:'Sumbit job successfully',
            sumbit_job_failed:'Sumbit job failed',
            mysql:'mysql',
            missing_field:'Missing field',
            job_id:'Job ID',
            job_status:'Job Status',
            loading:'Loading',
            clear_filter:'Clear filter',
            true:'Yes',
            false:'No',
            job_result:'Job result',
            job_result_file:'Job result file',
            job_info_field:'Job Info field',
            select_visible_columns:'Select visible columns',
            page_size:'Page size',
            confirm:'Confirm',
            model_name:'Model name',
            max_tokens:'Max Tokens',
            temperature:'Temperature',
            embedding_model_name:'Embedding model name',
            send:'Send',
            reset:'Reset',
            test_items:'Test items',
            pts_test:'PTS test items',
            select_test_items:'Select test items',
            select_pts_test:'Multi Select PTS test items',
            use_qa:'Use Knowledge QA',
            knowledge_index:'Use Knowledge',
            chatbot:'AWS Chat bot',
            upload_file:'Upload file',
            choose_files:'Choose files',
            choose_file:'Choose file',
            upload:'Upload',
            connection_retrying:'Connection faild, retrying......',
            docs:'Docs library',
            filename:'File name',
            index_name:'Index name',
            created_by:'Created by',
            build:'Build',
            compeletedtime:'Completed time',
            job_log:'Job logs',
            s3_results:'S3 results',
            chatspace:'Chat space',
            qa:'QA space',
            chat:'Chat',
            addtional_settings:'Additional settings',
            conversations:'Conversations',
            awschatportal:'AWS Chat Portal',
            embedding_endpoint:'Embedding model endpoint',
            apigateway_endpoint:'API Gateway endpoint',
            openai_api_key:'OPENAI API KEY',
            settings:'Settings',
            lang_settings:'Display Language',
            close:'Close',
            clear:'Clear',
            system_role:"System Role Name",
            system_role_prompt:"System Role Prompt",
            delete:'Delete',
            delete_doc_index:'Delete doc index',
            prompt_template:'Prompt template',
            template_name:'Template name',
            template_id:'Template Id',
            comment:'Comment',
            delete_template:'Delete template',
            edit:'Edit',
            template:'Template',
            add_template:'Add a template',
            preview:'Preview',
            readme:'README',
            hide_ref_doc:'Hide Ref Doc',
            upload_image:'Upload Image',
            multi_rounds:'Multi-rounds',
            use_stream:'Stream',
            correct_answer:'Correct',
            provide_your_answer:'Thanks for your answer',
            feedback_management:'Feedback Management',
            create_new_faq:'Create New FAQ',
            question:'Question',
            answer:'Answer',
            inject:"Inject",
            inject_new_faq:"Injected new FAQ to Knowledge base",
            confirm_change:'Save changes',
            update_new_faq:'Update FAQ',
            download_template:'Download Template',
            delete_feedback:'Delete feedback',
            new_chat:'New chat',
            info_field:'Info',
            use_trace:'Trace',
            examples_management:'Fewshot Examples',
            auto_suggestion:'AutoSuggestion',
            select_category:'Select Category',
            enable_search:'Enable Websearch',
            max_conversations:'Max Conversations',
            endpoint_name:'Endpoint Name',
            cust_chat_template:'Custom Chat Template',
            cust_chat_template_desc:'Only used when no chat_template is provided in tokenizer_config.json',
            image:'Image',
            examples:"Examples",
            instance_qty:"Instance Quantity",
            instance_qty_desc:"Number of SageMaker Endpoint Instances",
            enable:'Enable',
            refresh:"Refresh"
        }
      },
      zh:{
        translation:{
            admin:'管理',
            user:'用户',
            group:'组',
            usergroup:'用户组',
            home:'首页',
            workplace: '工作台',
            logs:'日志',
            signout:'退出登陆',
            preferences:'属性',
            nomatch:'没有匹配结果',
            jobs:'任务',
            view:'查看',
            Settings:'设置',
            adduser:'添加用户',
            addgroup:'添加用户组',
            admin_group:'管理员',
            normal_group:'普通用户',
            email:'Email',
            status:'状态',
            username:'用户名',
            createtime:'创建时间',
            add:'新增',
            create:'创建',
            create_job:'创建新任务',
            review_submit:'查看并提交',
            basic_config:'基础配置',
            output_s3:'结果输出S3桶名',
            output_s3_desc:'用于存放任务输出文件的S3桶名',
            csp:'CSP',
            csp_type:'CSP 类型',
            select_csp_type:'选择CSP',
            alicloud:'阿里云 (待后期实现)',
            alicloud_desc:'在阿里云中创建任务',
            aws_desc:'在AWS中创建任务',
            aws:'AWS',
            china:'中国',
            global:'海外',
            select_user_group:'选择用户组',
            aws_partition:'AWS分区',
            password:'密码',
            confirm_password:'二次输入密码',
            csp_cred :'云账号鉴权信息',
            region:'分区',
            region_desc:"请选择一个分区",
            vpc_config:'VPC配置',
            sg_ids:"安全组ID",
            vpc_id_desc:'输入已有的VPC ID',
            sg_ids_desc:"输入已有的安全组ID,如果有多个，则用逗号(,)分隔",
            auto_new_vpc:'自动创建新的VPC',
            job_desc:'任务描述',
            job_desc_long:'输入任务描述信息',
            entity_config:'实体资源配置',
            instance_family:'实例家族',
            instance_size:'实例大小',
            instance_type:'实例类型',
            input_instance_type_desc:'如果不在列表，则直接输入',
            job_type:'任务类型',
            select_job_type:'选择任务类型',
            pts_desc:'PTS 基准测试',
            pts:'PTS',
            sysbench:'Sysbench',
            sysbench_desc:'Sysbench 基准测试',
            subnet_ids:'子网ID',
            subnet_ids_desc:'输入已有的子网ID,如果有多个，则用逗号(,)分隔',
            next:'下一步',
            cancel:'取消',
            submit:'提交',
            previous:'上一步',
            optional:'可选',
            ec2_os_type:'OS类型',
            job_result:'任务结果',
            ec2_instance_type:'EC2实例类型',
            os_type_desc:'选择对应的OS操作系统',
            sumbit_job_success:'成功提交',
            sumbit_job_failed:'提交任务失败',
            missing_field:'缺少字段信息',
            loading:'加载中',
            job_id:'任务ID',
            job_status:'任务状态',
            clear_filter:"清除筛选",
            true:'是',
            false:'否',
            job_result_file:'结果文件',
            job_info_field:'任务信息字段',
            select_visible_columns:'选择可见列',
            page_size:'每页数量',
            confirm:'确认',
            send:'发送',
            reset:'重置',
            test_items:'测试项目',
            pts_test:'PTS测试项目',
            select_test_items:'选择测试项目',
            select_pts_test:'选取PTS测试项目',
            use_qa:'使用知识库问答',
            knowledge_index:'使用知识库',
            chatbot:'AWS智能问答',
            upload_file:'上传文件',
            choose_files:'选择文件',
            choose_file:'选择文件',
            upload:'上传',
            connection_retrying:'连接断开，重试中......',
            docs:'文档库',
            compeletedtime:'完成时间',
            job_log:'任务日志',
            s3_results:'S3结果文件',
            chatspace:'聊天区',
            qa:'问答区',
            chat:'聊天',
            model_name:'LLM模型',
            max_tokens:'最大Token数量',
            temperature:'Temperature',
            embedding_model_name:'Embedding模型',
            addtional_settings:'更多设置',
            conversations:'对话',
            embedding_endpoint:'Embedding模型端点名称',
            index_name:'索引名',
            filename:'文档名称',
            created_by:'创建者',
            apigateway_endpoint:'API网关端点URL',
            openai_api_key:'OPENAI API KEY',
            settings:'设置',
            lang_settings:'语言设置',
            close:'关闭',
            clear:'清空',
            system_role:'系统角色名',
            system_role_prompt:'系统角色提示词',
            delete:'删除',
            delete_doc_index:'删除文档索引',
            prompt_template:'提示词模板',
            template_name:'模板名称',
            template_id:'模板Id',
            comment:'备注',
            delete_template:'删除模板',
            edit:'编辑',
            template:'模板',
            add_template:'添加模板',
            preview:'预览',
            readme:'使用说明',
            hide_ref_doc:'隐藏引用',
            upload_image:'上传图片',
            multi_rounds:'多轮会话',
            use_stream:'Stream',
            correct_answer:'纠正',
            provide_your_answer:'感谢您的反馈',
            feedback_management:'反馈管理',
            create_new_faq:'创建新的FAQ',
            question:'问题',
            answer:'答案',
            inject:"注入知识库",
            inject_new_faq:"注入新的FAQ知识",
            confirm_change:'保存修改',
            update_new_faq:'更新FAQ',
            download_template:'下载模板',
            delete_feedback:'删除反馈',
            new_chat:'新对话',
            info_field:'信息',
            use_trace:'跟踪日志',
            examples_management:'Few shot示例管理',
            auto_suggestion:'自动建议',
            select_category:'选择分类',
            enable_search:'网页搜索',
            max_conversations:'最大聊天记录轮数',
            endpoint_name:'Endpoint名称',
            cust_chat_template:'自定义Chat Template',
            cust_chat_template_desc:'当tokenizer_config.json中没有提供chat_template时,使用此配置',
            image:'图片',
            examples:"示例",
            instance_qty:"实例数量",
            instance_qty_desc:"推理节点的实例数量",
            enable:'启用',
            refresh:'刷新',

        }
      }
    }
  });

export default i18n;