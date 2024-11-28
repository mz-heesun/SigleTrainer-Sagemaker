// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, {useEffect, useState} from 'react';
import {
    Container,
    Checkbox,
    ExpandableSection,
    Header,
    Input,
    RadioGroup,
    FormField,
    SpaceBetween,
    Select,
    Grid,
    Box,
    Multiselect,
    Toggle,
} from '@cloudscape-design/components';
import {
    FT_OPTIONS,
    QUANT_OPTIONS,
    TRAINING_STAGES,
    TRAINING_PRECISION,
    OPTMIZERS,
    INSTANCE_TYPES,
    BOOSTER_OPTIONS,
    DEEPSPEED
} from '../form-config';
import validateField from '../form-validation-config';
import {remotePost} from '../../../../common/api-gateway';
import {S3Selector} from './output-path';
import {JsonEditor} from './code-editor';
import {t} from 'i18next';


function AdvancedConfigs({onChange, readOnly, data, setData}) {
    return (
        <SpaceBetween size="l">
            <ExpandableSection headerText={`Extra ${t('configurations')}`} variant="footer">
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label="Warmup steps"
                        description="워밍업에 사용되는 단계 수입니다."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.warmup_steps : data.warmup_steps}
                               onChange={({detail: {value}}) => onChange('warmup_steps', value)}
                        />
                    </FormField>
                    <FormField
                        label="Logging steps"
                        description="두 로그 사이의 단계 수입니다."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.logging_steps : data.logging_steps}
                               onChange={({detail: {value}}) => onChange('logging_steps', value)}
                        />
                    </FormField>
                </Grid>
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label="Save steps"
                        description="두 체크포인트 사이의 단계 수입니다."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.save_steps : data.save_steps}
                               onChange={({detail: {value}}) => onChange('save_steps', value)}
                        />
                    </FormField>
                    <FormField
                        label="Optimizer"
                        description="사용할 최적화 프로그램입니다."
                        stretch={false}
                    >
                        <SelectOptimizer readOnly={readOnly} data={data} setData={setData}/>
                    </FormField>
                </Grid>

            </ExpandableSection>
            <ExpandableSection headerText={`Lora ${t('configurations')}`} variant="footer">
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label="LoRA rank"
                        description="LoRA 매트릭스의 순위입니다."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.lora_rank : data.lora_rank}
                               onChange={({detail: {value}}) => onChange('lora_rank', value)}
                        />
                    </FormField>
                    <FormField
                        label="LoRA alpha"
                        description="Lora 스케일링 계수."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.lora_alpha : data.lora_alpha}
                               onChange={({detail: {value}}) => onChange('lora_alpha', value)}
                        />
                    </FormField>
                </Grid>
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label="LoRA Target Modules"
                        description="v_proj,k_proj와 같은 Lora 대상 모듈, 기본값은 all이며 모든 선형 레이어에 적용됩니다."
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.lora_target_modules : data.lora_target_modules}
                               onChange={({detail: {value}}) => onChange('lora_target_modules', value)}
                        />
                    </FormField>
                </Grid>
            </ExpandableSection>
            <ExpandableSection headerText={`RLHF ${t('configurations')}`} variant="footer">
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label={t("rlhf_beta")}
                        description={t("rlhf_beta_desc")}
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.pref_beta : data.pref_beta}
                               onChange={({detail: {value}}) => onChange('pref_beta', value)}
                        />
                    </FormField>
                    <FormField
                        label={t("rlhf_ftx_gamma")}
                        description={t("rlhf_ftx_gamma_desc")}
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.pref_ftx : data.pref_ftx}
                               onChange={({detail: {value}}) => onChange('pref_ftx', value)}
                        />
                    </FormField>
                </Grid>
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label={t("rlhf_loss_type")}
                        stretch={false}
                    >
                        <SelectLossType data={data} setData={setData} readOnly={readOnly}/>
                    </FormField>
                </Grid>
            </ExpandableSection>
        </SpaceBetween>
    );
}

function DeepSpeedConfigs({onChange, readOnly, data, setData}) {
    return (
        <SpaceBetween size="l">
            <ExpandableSection headerText="DeepSpeed configurations (Applicable for Multi-GPU/Nodes)" variant="footer"
                               expanded>
                <Grid
                    gridDefinition={[{colspan: {default: 6, xxs: 4}}, {colspan: {default: 6, xxs: 4}}]}
                >
                    <FormField
                        label="DeepSpeed Stage"
                        description="DeepSpeed stage for distributed training."
                        stretch={false}
                    >
                        <RadioGroup
                            items={DEEPSPEED}
                            value={readOnly ? data.job_payload?.deepspeed : data.deepspeed}
                            onChange={({detail: {value}}) => onChange('deepspeed', value)}
                            readOnly={readOnly}
                        />
                    </FormField>
                </Grid>
            </ExpandableSection>

        </SpaceBetween>
    );
}

const SelectPromptTemplate = ({data, setData, readOnly, refs}) => {
    const [loadStatus, setLoadStatus] = useState("loading");
    const [items, setItems] = useState([]);
    // const initState = data.job_payload ? { label: data.job_payload.prompt_template, value: data.job_payload.prompt_template } : {};
    const [selectOption, setSelectOption] = useState({});
    useEffect(() => {
        if (data.job_payload) {
            setSelectOption({label: data.job_payload.prompt_template, value: data.job_payload.prompt_template});
            setData({prompt_template: data.job_payload.prompt_template})
        }
    }, [data.job_payload]);
    const handleLoadItems = async ({
                                       detail: {filteringText, firstPage, samePage},
                                   }) => {
        setLoadStatus("loading");
        try {
            const data = await remotePost({config_name: 'prompt_template'}, 'get_factory_config');
            const items = data.response.body.map((it) => ({
                prompt_template: it,
            }));
            setItems(items);
            setLoadStatus("finished");
        } catch (error) {
            console.log(error);
            setLoadStatus("error");
        }
    };
    return (
        <Select
            statusType={loadStatus}
            onLoadItems={handleLoadItems}
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({prompt_template: detail.selectedOption.value})
            }}
            options={items.map(({prompt_template}) => ({
                label: prompt_template,
                value: prompt_template,
            }))}
            selectedAriaLabel="Selected"
            ref={refs.prompt_template}
        />
    )
}


const SelectModelName = ({data, setData, readOnly, refs}) => {
    const [loadStatus, setLoadStatus] = useState("loading");
    const [items, setItems] = useState([]);
    // const initState = data.job_payload ? { label: data.job_payload.model_name, value: data.job_payload.model_name } : {};
    const [selectOption, setSelectOption] = useState({});
    useEffect(() => {
        if (data.job_payload) {
            setSelectOption({label: data.job_payload.model_name, value: data.job_payload.model_name})
            setData({model_name: data.job_payload.model_name})
        }
    }, [data.job_payload])
    const handleLoadItems = async ({
                                       detail: {filteringText, firstPage, samePage},
                                   }) => {
        setLoadStatus("loading");
        try {
            const data = await remotePost({config_name: 'model_name'}, 'get_factory_config');
            const items = data.response.body.map((it) => ({
                model_name: it.model_name,
                model_path: it.model_path,
            }));
            setItems(items);
            setLoadStatus("finished");
        } catch (error) {
            console.log(error);
            setLoadStatus("error");
        }
    };
    return (
        <Select
            statusType={loadStatus}
            onLoadItems={handleLoadItems}
            disabled={readOnly}
            selectedOption={selectOption}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({model_name: detail.selectedOption.value})
            }}
            options={items.map(({model_name, model_path}) => ({
                label: model_name,
                value: model_path,
                tags: [model_path]
            }))}
            selectedAriaLabel="Selected"
            ref={refs.model_name}
        />
    )
}

const SelectDatasets = ({data, setData, readOnly, refs}) => {
    const [loadStatus, setLoadStatus] = useState("loading");
    const [items, setItems] = useState([]);

    const initState = data.job_payload && data.job_payload.dataset ? data.job_payload.dataset.map(item => ({
        label: item, value: item
    })) : []
    // const [selectOption, setSelectOption] = useState(initState);

    const [selectedOptions, setSelectOptions] = useState(initState);
    const handleLoadItems = async ({
                                       detail: {filteringText, firstPage, samePage},
                                   }) => {
        setLoadStatus("loading");
        try {
            const resp = await remotePost({config_name: 'dataset', stage: data.stage}, 'get_factory_config');
            const items = resp.response.body.map((it) => ({
                dataset: it,
            }));
            setItems(items);
            setLoadStatus("finished");
        } catch (error) {
            console.log(error);
            setLoadStatus("error");
        }
    };
    useEffect(() => {
        setSelectOptions(initState);
        setLoadStatus("pending");
        setItems([]);
    }, [data.stage])

    return (
        <Multiselect
            statusType={loadStatus}
            onLoadItems={handleLoadItems}
            disabled={readOnly}
            selectedOptions={selectedOptions}
            onChange={({detail}) => {
                setSelectOptions(detail.selectedOptions);
                setData({dataset: detail.selectedOptions.map(it => it.value)})
            }}
            options={items.map(({dataset}) => ({
                label: dataset,
                value: dataset,
            }))}
            selectedAriaLabel="Selected"
            ref={refs.dataset}
        />
    )
}


const SelectStage = ({data, setData, readOnly, refs}) => {

    const initState = TRAINING_STAGES.filter(item => data.job_payload?.stage === item.value)
    const [selectOption, setSelectOption] = useState(initState.length ? initState[0] : {});
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({stage: detail.selectedOption.value})
            }}
            options={TRAINING_STAGES}
            selectedAriaLabel="Selected"
            ref={refs.stage}
        />
    )
}

const SelectOptimizer = ({data, setData, readOnly, refs}) => {
    const initState = OPTMIZERS.filter(item => data.job_payload?.optimizer === item.value)
    const [selectOption, setSelectOption] = useState(initState.length ? initState[0] : OPTMIZERS[0]);
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({optimizer: detail.selectedOption.value})
            }}
            options={OPTMIZERS}
            selectedAriaLabel="Selected"
        />
    )
}

const SelectInstanceType = ({data, setData, readOnly, refs}) => {
    // const initState = INSTANCE_TYPES.filter(item => data.job_payload?.instance_type === item.value)
    const [selectOption, setSelectOption] = useState([]);
    useEffect(() => {
        if (data.job_payload) {
            setSelectOption({label: data.job_payload.instance_type, value: data.job_payload.instance_type})
            setData({instance_type: data.job_payload.instance_type})
        }
    }, [data.job_payload])
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({instance_type: detail.selectedOption.value})
            }}
            options={INSTANCE_TYPES}
            selectedAriaLabel="Selected"
            ref={refs.instance_type}
        />
    )
}

const SelectLossType = ({data, setData, readOnly}) => {
    // const initState = INSTANCE_TYPES.filter(item => data.job_payload?.instance_type === item.value)
    const [selectOption, setSelectOption] = useState({label: 'sigmoid', value: 'sigmoid'});
    useEffect(() => {
        if (data.job_payload) {
            setSelectOption({label: data.job_payload.pref_loss, value: data.job_payload.pref_loss})
            setData({pref_loss: data.job_payload.pref_loss})
        }
    }, [data.job_payload])
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({pref_loss: detail.selectedOption.value})
            }}
            options={[
                {label: 'sigmoid', value: 'sigmoid'},
            ]}
            selectedAriaLabel="Selected"
        />
    )
}

const SelectTrainingPrecision = ({data, setData, readOnly, refs}) => {

    const initState = TRAINING_PRECISION.filter(item => data.job_payload?.training_precision === item.value)
    const [selectOption, setSelectOption] = useState(initState.length ? initState[0] : TRAINING_PRECISION[0]);
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({training_precision: detail.selectedOption.value})
            }}
            options={TRAINING_PRECISION}
            selectedAriaLabel="Selected"
        />
    )
}

const SelectBooster = ({data, setData, readOnly, refs}) => {
    const initState = BOOSTER_OPTIONS.filter(item => data.job_payload?.booster_option === item.value)
    const [selectOption, setSelectOption] = useState(initState.length ? initState[0] : BOOSTER_OPTIONS[0]);
    return (
        <Select
            selectedOption={selectOption}
            disabled={readOnly}
            onChange={({detail}) => {
                setSelectOption(detail.selectedOption);
                setData({booster_option: detail.selectedOption.value})
            }}
            options={BOOSTER_OPTIONS}
            selectedAriaLabel="Selected"
        />
    )
}


const formatS3Path = (path) => {
    if (!path.startsWith('s3://')) {
        path = 's3://' + path;
    }
    if (!path.endsWith('/')) {
        path += '/';
    }
    return path;
};


export default function DistributionPanel({
                                              loadHelpPanelContent,
                                              validation = false,
                                              readOnly = false,
                                              data,
                                              errors = {},
                                              setData,
                                              setErrors,
                                              setNotificationData,
                                              setDisplayNotify,
                                              setReadOnly,
                                              refs = {},
                                          }) {

    const onChange = (attribute, value) => {
        setData({[attribute]: value});

        // Validates when there is an error message in the field
        if (validation && errors[attribute]?.length > 0) {
            const {errorText} = validateField(attribute, value);
            setErrors({[attribute]: errorText});
        }
    };


    const onBlur = attribute => {
        if (!validation) {
            return;
        }

        const value = data[attribute];
        const {errorText} = validateField(attribute, value);

        setErrors({[attribute]: errorText});
    };

    useEffect(() => {
        //遍历data.job_payload中的所有元素，并setData({ [attribute]: value })
        if (data.job_payload) {
            Object.entries(data.job_payload).forEach(([attribute, value]) => {
                setData({[attribute]: value});
            });
            setData({
                job_name: data.job_name
            });
            setData({
                stage: data.job_type
            });
            setData({
                s3DataPath: data.job_payload.s3_data_path
            });
            setData({
                datasetInfo: data.job_payload.dataset_info
            });
        }
        console.log('init data:', data);

    }, [])

    return (
        <SpaceBetween size="xl" direction="vertical">
            <Container
                header={<Header variant="h2">Training job settings</Header>}
            >
                <SpaceBetween size="l">
                    <FormField
                        label="Job Name"
                        description="직업에 이름을 지어주세요."
                        stretch={false}
                        errorText={errors.job_name}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <Input readOnly={readOnly}
                               value={data.job_name}
                               onChange={({detail: {value}}) => onChange('job_name', value)}
                               placeholder="직업에 이름을 지어주세요"
                               ref={refs.job_name}
                               onBlur={() => onBlur('job_name')}
                        />
                    </FormField>

                    <FormField
                        label="Train Stage"
                        description="The stage to perform in training."
                        stretch={false}
                        errorText={errors.stage}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <SelectStage data={data} setData={setData} readOnly={readOnly} refs={refs}/>
                    </FormField>
                    <FormField
                        label="Model Name"
                        stretch={false}
                        // description="选择模型名称"
                        description="모델명 선택"
                        errorText={errors.model_name}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <SelectModelName data={data} setData={setData} readOnly={readOnly} refs={refs}/>
                    </FormField>
                    <FormField
                        label="Use Existing Model Weight (Optional)"
                        stretch={false}
                        // description="使用已有的模型文件进行训练"
                        description="학습을 위해 기존 모델 파일 사용"
                        errorText={errors.s3_model_path}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <S3Selector
                            readOnly={readOnly}
                            objectsIsItemDisabled={(item) => !item.IsFolder}
                            setOutputPath={(value) => setData({s3_model_path: value})}
                            outputPath={readOnly ? data.job_payload?.s3_model_path : data.s3_model_path}/>
                    </FormField>
                    <FormField
                        label="Use Existing Checkpoint (Optional)"
                        stretch={false}
                        description="기존 체크포인트 파일을 활용하여 학습을 이어갑니다. (⚠️: Lora 학습이라면 Lora 모델 체크포인트를 선택하세요)"
                        errorText={errors.s3_checkpoint}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <S3Selector
                            readOnly={readOnly}
                            objectsIsItemDisabled={(item) => !item.IsFolder}
                            setOutputPath={(value) => setData({s3_checkpoint: value})}
                            outputPath={readOnly ? data.job_payload?.s3_checkpoint : data.s3_checkpoint}/>
                    </FormField>

                    <FormField
                        label="Prompte Template"
                        description="데이터 세트의 형식을 지정하려면 프롬프트 템플릿을 선택하세요."
                        stretch={false}
                        errorText={errors.prompt_template}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <SelectPromptTemplate data={data} setData={setData} readOnly={readOnly} refs={refs}/>
                    </FormField>
                    <FormField
                        label="Finetuning method"
                        description="작업에 대한 미세 조정 방법을 선택하십시오."
                        stretch={true}
                    >
                        <RadioGroup
                            items={FT_OPTIONS}
                            readOnly={readOnly}
                            value={readOnly ? data.job_payload?.finetuning_method : data.finetuning_method}
                            onChange={({detail: {value}}) => onChange('finetuning_method', value)}
                            ref={refs.finetuning_method}
                        />
                    </FormField>
                    <FormField
                        label="Quantization bit"
                        description="Enable 4/8-bit model quantization (QLoRA)."
                        stretch={true}
                    >
                        <RadioGroup
                            items={QUANT_OPTIONS}
                            readOnly={readOnly}
                            value={readOnly ? data.job_payload?.quantization_bit : data.quantization_bit}
                            onChange={({detail: {value}}) => onChange('quantization_bit', value)}
                            ref={refs.quantization_bit}
                        />
                    </FormField>
                    <FormField
                        label="Booster Option"
                        stretch={true}
                    >
                        <RadioGroup
                            items={BOOSTER_OPTIONS}
                            readOnly={readOnly}
                            value={readOnly ? data.job_payload?.booster_option : data.booster_option}
                            onChange={({detail: {value}}) => onChange('booster_option', value)}
                            ref={refs.booster_option}
                        />
                    </FormField>
                    <FormField
                        label={t("max_job_run_hour")}
                        description={t("max_job_run_hour_desc")}
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.max_job_run_hour : data.max_job_run_hour}
                               onChange={({detail: {value}}) => onChange('max_job_run_hour', value)}
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
            <Container
                header={<Header variant="h2">Datasets settings</Header>}
            >
                <SpaceBetween size="l">
                    <FormField
                        label="Training Data in S3"
                        stretch={false}
                        description="자신의 데이터세트의 S3 경로를 입력하세요."
                        errorText={errors.s3DataPath}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <S3Selector label={"S3 Data Path"}
                                    readOnly={readOnly}
                                    objectsIsItemDisabled={(item) => !item.IsFolder}
                                    setOutputPath={(value) => setData({s3DataPath: formatS3Path(value)})}
                                    outputPath={readOnly ? data.job_payload?.s3_data_path : data.s3DataPath}/>
                    </FormField>
                    {data.job_payload?.s3_data_path}
                    {(data.job_payload?.s3_data_path || data.s3DataPath) && (data.job_payload?.s3_data_path.trim() !== '' || data.s3DataPath.trim() !== '') &&
                        <FormField
                            label="Dataset Info"
                            description="Json 형식의 데이터 세트 정보를 준비해야 합니다. 예를 들어"
                            stretch={false}
                        >
                            <JsonEditor
                                readOnly={readOnly}
                                value={readOnly ? data.job_payload?.dataset_info : data.datasetInfo}
                                onDelayedChange={(event) => onChange('datasetInfo', event.detail.value)}
                            />
                        </FormField>
                    }

                    <FormField
                        label={t("public_datasets")}
                        stretch={false}
                        description="hf에서 오픈 소스 데이터세트를 선택하세요."
                        errorText={errors.dataset}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <SelectDatasets data={data} setData={setData} readOnly={readOnly} refs={refs}/>
                    </FormField>
                    <Grid gridDefinition={[{colspan: {"default": 4, xxs: 4}}, {colspan: {"default": 4, xxs: 4}},
                    ]}>
                        <FormField
                            label="Max samples"
                            description="데이터 세트당 최대 샘플입니다."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.max_samples : data.max_samples}
                                   onChange={({detail: {value}}) => onChange('max_samples', value)}
                            />
                        </FormField>
                        <FormField
                            label="Cutoff length"
                            description="입력 순서의 최대 토큰."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.cutoff_len : data.cutoff_len}
                                   onChange={({detail: {value}}) => onChange('cutoff_len', value)}
                            />
                        </FormField>
                    </Grid>
                    <Grid gridDefinition={[{colspan: {"default": 4, xxs: 4}}]}>
                        <FormField
                            label="Val size"
                            description="개발 세트의 데이터 비율."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.val_size : data.val_size}
                                   onChange={({detail: {value}}) => onChange('val_size', value)}
                            />
                        </FormField>
                    </Grid>
                </SpaceBetween>
            </Container>
            <Container
                header={<Header variant="h2">{t("training_instance_settings")}</Header>}
                footer={<DeepSpeedConfigs data={data} onChange={onChange} readOnly={readOnly} setData={setData}/>}
            >
                <SpaceBetween size="l">
                    <FormField
                        label="Instances Type"
                        description="훈련할 인스턴스 유형을 선택합니다."
                        stretch={false}
                        errorText={errors.instance_type}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <SelectInstanceType data={data} setData={setData} readOnly={readOnly} refs={refs}/>
                    </FormField>
                    <FormField
                        label="Instances amount"
                        description="인스턴스 양 설정"
                        stretch={false}
                        errorText={errors.instance_num}
                        i18nStrings={{errorIconAriaLabel: 'Error'}}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload.instance_num : data.instance_num}
                               ref={refs.instance_num}
                               onChange={({detail: {value}}) => onChange('instance_num', value)}
                        />
                    </FormField>
                    <FormField
                        label={t("use_spot")}
                        description={t("use_spot_desc")}
                        stretch={false}
                    >
                        <Toggle
                            readOnly={readOnly}
                            checked={readOnly ? data.job_payload?.use_spot : data.use_spot}
                            onChange={({detail: {checked}}) => onChange('use_spot', checked)}
                        >
                            {t("enable")}
                        </Toggle>
                    </FormField>
                    <FormField
                        label={t("max_spot_wait")}
                        description={t("max_spot_wait_desc")}
                        stretch={false}
                    >
                        <Input readOnly={readOnly}
                               value={readOnly ? data.job_payload?.max_spot_wait : data.max_spot_wait}
                               onChange={({detail: {value}}) => onChange('max_spot_wait', value)}
                        />
                    </FormField>
                </SpaceBetween>
            </Container>
            <Container header={<Header variant="h2">{t("hyper_params_settings")}</Header>}
                       footer={<AdvancedConfigs data={data} onChange={onChange} readOnly={readOnly} setData={setData}/>}
            >
                <SpaceBetween size="l">
                    <Grid gridDefinition={[{colspan: {"default": 6, xxs: 4}}, {colspan: {"default": 6, xxs: 4}}]}>
                        <FormField
                            label="Learning rate"
                            description="AdamW의 초기 학습 속도."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.learning_rate : data.learning_rate}
                                   onChange={({detail: {value}}) => onChange('learning_rate', value)}
                            />
                        </FormField>
                        <FormField
                            label="Epoch"
                            description="수행할 총 학습 에포크 수입니다."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.num_train_epochs : data.num_train_epochs}
                                   onChange={({detail: {value}}) => onChange('num_train_epochs', value)}
                            />
                        </FormField>
                    </Grid>
                    <Grid gridDefinition={[{colspan: {"default": 6, xxs: 4}}, {colspan: {"default": 6, xxs: 4}}]}>
                        <FormField
                            label="Batch size per device"
                            description="각 GPU에서 처리된 샘플 수입니다."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.per_device_train_batch_size : data.per_device_train_batch_size}
                                   onChange={({detail: {value}}) => onChange('per_device_train_batch_size', value)}
                            />
                        </FormField>
                        <FormField
                            label="Gradient accumulation"
                            description="경사 누적 단계 수입니다."
                            stretch={false}
                        >
                            <Input readOnly={readOnly}
                                   value={readOnly ? data.job_payload?.gradient_accumulation_steps : data.gradient_accumulation_steps}
                                   onChange={({detail: {value}}) => onChange('gradient_accumulation_steps', value)}
                            />
                        </FormField>
                    </Grid>
                    <Grid gridDefinition={[{colspan: {"default": 6, xxs: 4}}, {colspan: {"default": 6, xxs: 4}}]}>
                        <FormField
                            label="Training precision"
                            description="혼합 정밀도 훈련을 사용할지 여부입니다."
                            stretch={false}
                        >
                            <SelectTrainingPrecision data={data} readOnly={readOnly} setData={setData}/>
                        </FormField>
                    </Grid>
                </SpaceBetween>
            </Container>
        </SpaceBetween>
    );
}
